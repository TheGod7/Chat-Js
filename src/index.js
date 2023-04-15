import app from "./app.js";
import http from "http";
import { Server as socket } from "socket.io";
import sockets from "./socket.js";

const server = http.createServer(app);
const io = new socket(server);

sockets(io);

server.listen(app.get("port"), () => {
  console.log("Server is running on port", app.get("port"));
});
