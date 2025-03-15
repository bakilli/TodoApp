import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import todoRoutes from "./routes/todoRoutes";
import path from "path";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 2222;

console.log(__dirname);

app.set("view engine", "ejs");
app.set("views", "src/views");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// MongoDB
mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
  });

app.use("/", todoRoutes)

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});