const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.get("/message", (req, res) => res.send("message to socket.io"));
app.get("/", (req, res) => res.send("Welcome to socket.io"));

// io.on("connection", function (socket) {
//   console.log("socket connected");
// });

http.listen(3000, () => console.log("listening on http://localhost:3000"));
let message = "message";
io.on("connection", function (socket) {
  console.log("socket connected .....", socket.id);
  socket.on(message, function (player) {
    players[socket.id] = player;

    console.log(
      "Player " + player.userName + " with id: " + socket.id + " has joined.",
    );
    // console.log("inside chekcing socket.....", socket);
    // console.log("message: --------- " + player);
    io.emit("message", player);
  });

  socket.on("typing", function (message) {
    io.emit("typing", message);
  });
});

io.on("secondConnection", function (socket) {
  console.log("second socket connected .....", socket);
  socket.on("secondMessage", function (msg) {
    console.log("secondMessage: --------- " + msg);
    io.emit("secondMessage", msg);
  });
});
