import { Server } from "socket.io";

let ioInstance = null;

export const initSocket = (server) => {
  if (!ioInstance) {
    ioInstance = new Server(server, {
      path: "/socket.io",
      cors: {
        origin: ["http://localhost:6054", "https://lskinessentials.com"],
      },
    });

    ioInstance.on("connection", (socket) => {
      console.log("Socket connected:", socket.id);
      socket.on("disconnect", () => {
        console.log("Socket disconnected:", socket.id);
      });
    });
  }
  return ioInstance;
};

export const getSocket = () => {
  if (!ioInstance) {
    throw new Error("Socket.io not initialized!");
  }
  return ioInstance;
};
