import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, "chat.json");

const adapter = new JSONFile(file);

const db = new Low(adapter);

const users = [];

export default (io) => {
  io.on("connection", async (socket) => {
    users.push(socket.id); // Put the id in array
    //Load all Messages
    socket.emit("message:load", (await db.read()) ? db.data : db.data);

    //Send New Message
    socket.on("message:add", async (MessageC) => {
      db.data.messages.push(MessageC);
      await db.write();
      io.emit("message:loadNew", db.data);
    });

    //Disconnect
    async function rm(value, index, arr) {
      if (value === socket.id) {
        arr.splice(index, 1);
        return true;
      }
      return false;
    }

    socket.on("disconnect", async () => {
      users.filter(rm); // Remove the user of the array
      // Delete all messages inside the db if no are users connected
      if (users.length < 1) {
        db.data = { messages: [] };
        await db.write();
      }
    });
  });
};
