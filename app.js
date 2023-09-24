const express = require('express');
const socket = require('socket.io');

const app = express();
app.use(express.static("public"));

let port = 3000;
const server = app.listen(port, () => {
    console.log(`Server is running at ${port}`);
})

let io = socket(server);
io.on("connection",(socket) => {
    console.log("Made socket connection");

    //Recieved Data
    socket.on("beginPath",(data) => {
        // data from frontend
        // Transfer data to all connected computers
        io.sockets.emit("beginPath",data);
    })   

    socket.on("drawStroke",(data) => {
        io.sockets.emit("drawStroke",data);
    })

    socket.on("undoRedoCanvas",(data) => {
        io.sockets.emit("undoRedoCanvas",data);
    })
})