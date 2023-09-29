import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.port || 8000;
import authRouter from "./routes/authRoutes.js";
import propertyRouter from "./routes/propertyRoutes.js";
import uploadRouter from "./routes/upload.js";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

connectDB();

const app = express();

//middlewares
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use("/api", authRouter);
app.use("/api", propertyRouter);
app.use("/api", uploadRouter);

//initialize
app.get("/api", (req, res) => {
  res.status(200).json({
    message: "api route is up and running",
  });
});

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is up and running",
  });
});

// error middlewares
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log("server started on port", port);
});
