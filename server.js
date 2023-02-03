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

  console.log({ romeRedirectedId });

  res.redirect(`/${romeRedirectedId}`);
});

app.get("/:rome", (req, res) => {
  res.send("Hello World!");
  // res.render("rome", { romeId: req.params.rome });
});

const port = 5000;
app.listen(port, () => {
  console.log(`Express server listening on *: ${port}`);
});

server.listen(3000, () => {
  console.log("socker listening on *:3000");
});
