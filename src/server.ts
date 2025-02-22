import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";
import dotenv from "dotenv";
dotenv.config();

const port = config.port;
const uri = process.env.MONGO_URI;
async function main() {
  try {
    await mongoose.connect(uri as string);
  } catch (err: any) {
    console.error("Error while connecting to MongoDB", err);
  }
}

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
  main()
    .then(() => {
      console.log("Connection to MongoDB started successfully");
    })
    .catch((err: any) => {
      console.error(err);
    });
});
