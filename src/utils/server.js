const express = require("express");

function createServer() {
    require('dotenv').config()
    const server = express();

    server.use(express.urlencoded()); // url encodé pour save les données encodé dans des fichiers json
    server.use(express.json());

    const postRoute = require("../api/routes/postRoute");
    postRoute(server);

    const commentRoute = require("../api/Routes/commentRoute");
    commentRoute(server);

    const userRoute = require("../api/routes/userRoute");
    userRoute(server);

    return server
}

module.exports = createServer();