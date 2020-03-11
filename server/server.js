const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;

const fs = require("fs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/hello", (req, res) => {
  res.send({ express: "Hello From Express" });
});

app.post("/api/saveFile", (req, res) => {
  const { algorithm, instance, duration, cost, path } = req.body;

  const pathString = JSON.stringify(path)
    .replace(/[^\w\s]/gi, " ")
    .slice(1);
  const data = `${duration}\n${cost}\n${pathString}`;

  fs.writeFile(`outputs/${algorithm}/${instance}.txt`, data, function(err) {
    if (err) {
      return console.log(err);
    }

    console.log("The file was saved!");
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
