
import express from "express";
import config from "./config/config";
import { connectToDB } from "./config/mongoose";

const app = express();


connectToDB()
app.listen(config.port, () => {
  console.log(`🚀 Server running on http://localhost:${config.port}`);
});
