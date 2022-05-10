const express = require("express");
const app = express();

app.use(express.json()); // for parsing application/json

app.get("/", (req, res) => {
  res.send({
    message: "hola",
  });
});
app.get("/test", (req, res) => {
  res.send({
    message: "hola",
  });
});
app.post("/sum", (req, res) => {
  res.send({
    result: req.body.a + req.body.b,
  });
});

app.post("/product", (req, res) => {
  res.send({
    result: req.body.a * req.body.b,
  });
});
app.post("/sumArray", (req, res) => {
  if ([...req.body.a, ...req.body.b]) {
    res.send({
      result: true,
    });
  }
});

module.exports = app; // Exportamos app para que supertest session la pueda ejecutar
