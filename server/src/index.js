import express from "express";
import { config } from "dotenv";
import connnectToDB from "./config/dbConnnection.js";
import cookieParser from "cookie-parser";
import { userRouter } from "./routes/userRoutes.js";
import { tweetRouter } from "./routes/tweetRoute.js";
import cors from "cors";

config();
const app = express();
const PORT = process.env.PORT || 3000;

connnectToDB();

// middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

// api
app.use("/api/auth", userRouter);
app.use("/api/tweet", tweetRouter);

app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
