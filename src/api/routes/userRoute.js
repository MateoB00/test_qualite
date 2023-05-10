module.exports = (server) => {
  const userController = require("../Controllers/userController");

  server.post("/user/register", userController.userRegister);
  server.post("/user/login", userController.userLogin);
};
