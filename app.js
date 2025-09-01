import express from "express";
import dotenv from "dotenv";
import testDB from "./src/config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

testDB().then(() => {
  app.listen(PORT, () => {
    console.log(`servidor corriendo en el puerto ${PORT}`);
  });
});
