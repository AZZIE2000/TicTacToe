// getting the socket in setting up the server port / making it listen to the client port
const io = require("socket.io")(3001, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

// this runs on the start of the connection / {server side}
io.on("connection", (socket) => {
  //to get the number of clients in this room
  console.log(socket.id);
  // socket.off("sender", msg);
  socket.on("room", (msg) => {
    const clients = io.sockets.adapter.rooms.get(msg);
    const numClients = clients ? clients.size : 0;
    if (numClients > 0) {
      socket.to(msg).emit("start", false);
    } else {
      socket.to(msg).emit("start", true);
    }
    console.log(numClients);
    // if (msg != "") {
    //   socket.emit("room-exist", msg);
    // }
    socket.join(msg);
    console.log(msg);
  });
  socket.on("num", (num, room, me) => {
    socket.join(room);
    console.log(num);
    console.log(room);
    console.log(me);
    socket.to(room).emit("res-num", num, me);
  });
});
