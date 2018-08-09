const express = require("express");
const app = express();
const path = require("path");

const PORT = "8080";
const HOST = "localhost";

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./index.html"));
});

app.get("/:file", (req, res) => {
  res.sendFile(__dirname + "/" + req.params.file);
});

app.get("/static/:path/:name", (req, res) => {
  var options = {
    root: __dirname + "/static/",
    dotfiles: "deny",
    headers: {
      "x-timestamp": Date.now(),
      "x-sent": true
    }
  };

  let path = req.params.path;
  let fileName = req.params.name;
  res.sendFile(path + "/" + fileName, options, err => {
    if (err) {
      console.log(err);
    } else {
      console.log(new Date(), " Sent: ", fileName);
    }
  });
});

app.get("/api/clients", (req, res) => {
  res.sendFile(path.join(__dirname, "./generated.json"));
});

app.listen(PORT, HOST);
console.log(`Listening on ${HOST}:${PORT}`);
