module.exports = (server) => {
  const PostController = require("../controllers/postController");
  const jwtMidlleware = require("../midllewares/jwtMidlleware");

  server
    .route("/posts")
    .get(PostController.listAllPosts)
    .post(
      jwtMidlleware.verifyToken,
      PostController.createAPost);

  server
    .route("/posts/:post_id")
    .all(jwtMidlleware.verifyToken)
    .get(PostController.getAPost)
    .put(PostController.updateAPost)
    .delete(PostController.deleteAPost);
};