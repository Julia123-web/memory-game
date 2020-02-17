const express = require("express");
const app = express();
const port = process.env.PORT || 4000;

const user = require("./User/model");
console.log("I WANT TO SEE", user);

const db = require("./db");
console.log("SEE THIS", db);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
