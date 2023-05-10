const createServer = require('./utils/server');

const server = createServer;

const hostname = "0.0.0.0";
const port = 3000;

const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

mongoose.connect("mongodb://localhost/apinode");

server.listen(port, hostname);
