const { Router } = require("express");
const Score = require("./model");
const authMiddleware = require("../auth/middleWare");

function scoreRouter(stream) {
  const router = new Router();

  router.post("/score", authMiddleware, async function(
    request,
    response,
    next
  ) {
    try {
      const { level, score } = request.body;
      const user = request.user;

      await Score.create({
        level,
        score,
        userId: user.id
      });

      const action = {
        type: "ONE_NEW_SCORE",
        payload: { level, score, username: user.email }
      };
      const json = JSON.stringify(action);

      stream.send(json);

      response.send(score);
    } catch (error) {
      next(error);
    }
  });

  router.get("/score", async function(request, response, next) {
    try {
      const score = await Score.findAll();
      response.send(score);
    } catch (error) {
      next(error);
    }
  });
  return router;
}

module.exports = scoreRouter;
