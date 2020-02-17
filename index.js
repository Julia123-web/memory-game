const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const Sse = require("json-sse");
const Room = require("./Room/model");

const cors = require("cors");
const corsMiddleWare = cors();
app.use(corsMiddleWare);

const parserMiddleWare = express.json();
app.use(parserMiddleWare);

const stream = new Sse();

app.get("/stream", async (request, response, next) => {
  try {
    const rooms = await Room.findAll();

    const action = {
      type: "ALL_ROOMS",
      payload: rooms
    };

    const json = JSON.stringify(action);

    stream.updateInit(json);
    stream.init(request, response);
  } catch (error) {
    next(error);
  }
});

const userRoutes = require("./User/router");
app.use(userRoutes);

const roomRoutes = require("./Room/router");
app.use(roomRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// const user = require("./User/model");
// console.log("I WANT TO SEE", user);

// const db = require("./db");
// console.log("SEE THIS", db);
