import express from "express";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.port || 8000;
import authRouter from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import errorHandler from "./middleware/errorMiddleware.js";

connectDB();

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(errorHandler);

// routes
app.use("/api", authRouter);

//initialize
app.get("/api", (req, res) => {
  res.status(200).json({
    message: "Server is up and running",
  });
});
app.listen(port, () => {
  console.log("server started on port", port);
});
