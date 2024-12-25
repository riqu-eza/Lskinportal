import { Server } from "socket.io";

const io = new Server(3006, {
  path: "/socket.io",
  cors: {

    origin: ["http://localhost:6054",'http://lskinessentials.com/'] // Replace with your frontend URL
  },
});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

export { io };
