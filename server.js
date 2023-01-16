import * as dotenv from "dotenv";
dotenv.config();
import express from "express";

import morgan from "morgan";
import cors from "cors";
import userRouter from "./routes/photoRoute.js";
import "./lib/connect.js";

const PORT = process.env.PORT || 4000;
const URI = process.env.URI || "mongodb://localhost:27017/test";
// initialize express
const app = express();

// set middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// set routes
app.use("/photos", userRouter);

// set express on PORT
app.listen(PORT, () => {
  console.log("Server listen on PORT: " + PORT);
});
