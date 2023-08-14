const express = require("express");

const dotenv = require("dotenv").config();

const path = require("path");
const { Socket } = require("socket.io");

const app = express();
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT_NUMBER;

const server = app.listen(process.env.PORT_NUMBER, "127.0.0.1", () => {
  console.log(`app started at ${PORT}`);
});

let sockets_connected=new Set()


const io = require("socket.io")(server);

io.on("connection", (socket) => {
  console.log(socket.id);
  sockets_connected.add(socket.id)

  io.emit("clients-total",sockets_connected.size)

  socket.on("disconnect",()=>{
    sockets_connected.delete(socket.id)
  })
  io.emit("clients-total",sockets_connected.size)
  socket.on("message",(data)=>{
    console.log(data)
    socket.broadcast.emit("chat-message",data)
  })
});


