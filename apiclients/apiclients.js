const express = require("express");
const app = express();
const path = require("path");
const cors = require('express-cors');

const PORT = "4000";
const HOST = "localhost";

app.use(cors({
  allowedOrigins: [
    'http://localhost:9000',
  ]
}));

app.get("/api/clients", (req, res) => {
  console.log(req.ip, `clients sent`);
  res.sendFile(path.join(__dirname, "./generated.json"));
});

app.listen(PORT, HOST);
console.log(`Listening on ${HOST}:${PORT}`);

