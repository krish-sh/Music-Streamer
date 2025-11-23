import adminModel from "../models/adminModels.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import path from "path";
import musicModel from "../models/musicModels.js";

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const existingUser = await adminModel.findOne({ email });
    if (existingUser) {
      return res
        .status(405)
        .json({ success: false, message: "User Already Existed" });
    }

    const salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new adminModel({
      username,
      email,
      password: hashPassword,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: false,
      secure: false,
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const userResponse = {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    };

    res.status(200).json({
      success: true,
      message: "User Register Successfully",
      user: userResponse,
      token,
    });
  } catch (error) {
    console.log("Error in Admin Register", error);
    res.status(500).json({ success: false, message: "Interval Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await adminModel.findOne({ email });
    if (!user) {
      return res.status(405).json({
        success: false,
        messgae: "User not existed",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(402).json({
        success: false,
        message: "Password is Invalid",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: false,
      secure: false,
      sameSite: "Lax",
      Age: 7 * 24 * 60 * 60 * 1000,
    });

    const userResponse = {
      id: user._id,
      email: user.email,
    };

    res.status(200).json({
      success: true,
      messgae: "User Logged in Sucessfully ",
      token,
      user: userResponse,
    });
  } catch (error) {
    console.log("Error in admincontroller Login :", error);
    res.status(500).json({
      success: false,
      message: "Interval server error",
    });
  }
};

const uploadMusic = async (req, res) => {
  try {
    const { title, artist } = req.body;

    if (!title || !artist) {
      return res
        .status(401)
        .json({ success: false, message: "All fields are required" });
    }

    const musicFile = req.files.music?.[0];
    const imageFile = req.files.image?.[0];

    if (!musicFile) {
      return res.status(400).json({
        success: false,
        message: "No music file uploaded",
      });
    }
    if (!imageFile) {
      return res.status(400).json({
        success: false,
        message: "image file is required",
      });
    }

    const allowedExtenison = [".mp3", ".wav", ".jpg", ".jpeg", ".png", ".webp"];
    const musciExt = path.extname(musicFile.originalname).toLowerCase();
    const imageExt = path.extname(imageFile.originalname).toLowerCase();

    if (
      !allowedExtenison.includes(musciExt) ||
      !allowedExtenison.includes(imageExt)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Only given files are required : '.mp3, .wav, .jpg, .jpeg, .png, .webp'",
      });
    }

    const filePath = `tmp/${musicFile.filename}`;
    const imageFilePath = `tmp/${imageFile.filename}`;

    const music = new musicModel({
      title,
      artist,
      filePath,
      imageFilePath,
    });

    await music.save();

    res.status(200).json({
      success: true,
      message: "Uploaded successfully",
      music,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      messgae: "Internal Error in uploadmusic controller ",
    });
  }
};

const getMusic = async (req, res) => {
  try {
    const music = await musicModel.find();
    if (!music) {
      return res.status(400).json({
        success: false,
        messgae: "No Music found at this moment",
      });
    }

    res.json({ success: true, music });
  } catch (error) {
    console.log("error", error);
    return res
      .status(500)
      .json({ success: false, messgae: "Internal Get music error :" });
  }
};

const deleteMusic = async (req, res) => {
  try {
    const { id } = req.params;

    const music = await musicModel.findByIdAndDelete(id);
    if (!music) {
      return res.status(404).json({
        success: false,
        message: "Music id doesn't found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Music deleted successfully",
      music,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      messgae: "Internal delete error",
    });
  }
};

export { register, login, uploadMusic, getMusic, deleteMusic };
