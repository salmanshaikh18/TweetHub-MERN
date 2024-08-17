import express from "express";
import { config } from "dotenv";
import connnectToDB from "./config/dbConnnection.js";
import cookieParser from "cookie-parser";
import { userRouter } from "./routes/userRoutes.js";

config();
const app = express();
const PORT = process.env.PORT || 3000;

connnectToDB();

// middlewares
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

// api
app.use("/api/auth", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});

