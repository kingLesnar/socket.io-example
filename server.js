const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));

io.on("connection", function (socket) {
  console.log("socket connected");
});

http.listen(3000, () => console.log("listening on http://localhost:3000"));

io.on("connection", function (socket) {
  io.emit("user connected");
  socket.on("message", function (msg) {
    io.emit("message", msg);
  });
});
