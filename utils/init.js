const express = require("express");
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "*"
    }
});
module.exports = {
    app,
    io,
    server
};