import express from "express";
import config from "./config/config";
import { connectToDB } from "./config/mongoose";
import supplierRouter from "./routes/supplierRoutes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/api/v1/suppliers', supplierRouter);




app.listen(config.port, async() => {
  console.log(`🚀 Server running on http://localhost:${config.port}`);
  await connectToDB()
});



export default app;