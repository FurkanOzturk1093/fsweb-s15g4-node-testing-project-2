const express = require("express");
const server = express();
server.use(express.json());

const watchRouter = require("./watches/watches-router");
server.use("/api/watches", watchRouter);
module.exports = server;
