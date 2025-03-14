import express from "express";
import path from "path";

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

app.get("/", (req: any, res: any) => {
  res.render("index");
});

app.listen(1111, () => {
  console.log("Server is running on port 1111 http://localhost:1111");
});