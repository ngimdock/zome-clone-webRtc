import express from "express";
import http from "http";
import { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";

const app = express();

const server = http.createServer(app);
const io = new Server(server);

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  const romeRedirectedId = uuidv4();

  res.redirect(`/${romeRedirectedId}`);
});

app.get("/:rome", (req, res) => {
  res.render("room", { roomId: req.params.rome });
});

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId);

    io.to(roomId).emit("user-connected", userId);

    socket.on("disconnect", () => {
      socket.to(roomId).emit("user-disconnected", userId);
    });
  });
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`server listening on *:${PORT}`);
});
