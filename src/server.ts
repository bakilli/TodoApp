import express from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = 1111;


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req: any, res: any) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});