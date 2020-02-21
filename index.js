const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const Sse = require("json-sse");
const Room = require("./Room/model");
const Score = require("./Score/model");
const User = require("./User/model");

const cors = require("cors");
const corsMiddleWare = cors();
app.use(corsMiddleWare);

const parserMiddleWare = express.json();
app.use(parserMiddleWare);

const stream = new Sse();

// app.get("/stream", async (request, response, next) => {
//   try {
//     const rooms = await Room.findAll();

//     const action = {
//       type: "ALL_ROOMS",
//       payload: rooms
//     };

//     const scores = await Score.findAll()

//     const json = JSON.stringify(action);

//     stream.updateInit(json);
//     stream.init(request, response);
//   } catch (error) {
//     next(error);
//   }
// });
app.get("/stream", async (request, response, next) => {
  try {
    const scores = await Score.findAll({ include: [User] });
    // [{ level, score, userId}, {...}]

    // { easy: [{user, score}, {...}], medium: [..]}
    console.log(scores);
    const parsedScores = scores.reduce(
      (acc, currScore) => {
        console.log(currScore.level, "LEVEL");
        console.log(acc);
        acc[currScore.dataValues.level].push({
          score: currScore.dataValues.score,
          username: currScore.dataValues.user.email
        });
        return acc;
      },
      {
        "1": [],
        "2": [],
        "3": []
      }
    );

    const action = {
      type: "ALL_SCORES",
      payload: parsedScores
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
app.use(roomRoutes(stream));

const scoreRoutes = require("./Score/router");
app.use(scoreRoutes(stream));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// const user = require("./User/model");
// console.log("I WANT TO SEE", user);

// const db = require("./db");
// console.log("SEE THIS", db);
