const express = require("express");
const cors = require("cors");
const posts = require("./posts");

const app = express();
app.use(cors());

app.get("/posts", (req, res) => {
  res.json(posts);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});