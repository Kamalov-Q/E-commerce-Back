import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
};

//Rwx8znfhfDFR4ohe
