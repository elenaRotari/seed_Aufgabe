import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 4000;
const URI = process.env.URI;
mongoose.connect(URI, () => {
  console.log("DB-conected");
});
