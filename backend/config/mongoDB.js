import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => console.log("MongooDB connected"));

  await mongoose.connect(`${process.env.MONGO_URI}`);

  mongoose.connection.off("unConnected", () =>
    console.log("MongooDb connection error")
  );
};

export default connectDB;
