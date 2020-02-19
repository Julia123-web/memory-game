const { Router } = require("express");
const Room = require("./model");
const { toJWT } = require("../auth/jwt");

function roomRouter(stream) {
  const router = new Router();

  router.post("/room", async function(request, response, next) {
    try {
      const room = await Room.create(request.body);

      const action = {
        type: "ONE_NEW_ROOM",
        payload: room
      };
      const json = JSON.stringify(action);

      stream.updateInit(json);
      stream.init(request, response);

      response.send(room);
    } catch (error) {
      next(error);
    }

    router.get("/room", async function(request, response, next) {
      try {
        const room = await Room.findAll();
        response.send(room);
      } catch (error) {
        next(error);
      }
    });
    const token = toJWT({ id: user.id });
    return response.status(200).send({ token: token });
  });

  return router;
}

module.exports = roomRouter;
