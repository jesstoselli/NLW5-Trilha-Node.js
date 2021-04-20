import express from "express";

import "./database";

const app = express();

app.listen(3333, () => console.log("Server is running on port 3333"));

app.get("/", (req, res) => {
  return res.json({
    message: "Hello NLW#05",
  });
});

app.post("/", (req, res) => {
  return res.json({
    message: "User successfully created.",
  });
});

/*
GET
POST
PUT => change all fields
PATCH => change an specific field
DELETE
*/
