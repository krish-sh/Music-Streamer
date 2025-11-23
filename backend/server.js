import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongoDB.js";
import adminRouter from "./routes/adminRouter.js";
import path from "path";

dotenv.config();

connectDB();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/tmp", express.static(path.join(path.resolve(), "tmp")));

app.use("/api/admin", adminRouter);

app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});
