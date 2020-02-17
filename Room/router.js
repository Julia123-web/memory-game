const { Router } = require("express");
const Room = require("./model");
const { toJWT } = require("../auth/jwt");

const router = new Router();

router.post("/room", async function(request, response, next) {
  try {
    const room = await Room.create(request.body);
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

module.exports = router;
