const express = require("express");
const app = express();
const port = process.env.PORT || 4000;

const cors = require("cors");
const corsMiddleWare = cors();
app.use(corsMiddleWare);

const parserMiddleWare = express.json();
app.use(parserMiddleWare);

const userRoutes = require("./User/router");
app.use(userRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// const user = require("./User/model");
// console.log("I WANT TO SEE", user);

// const db = require("./db");
// console.log("SEE THIS", db);
