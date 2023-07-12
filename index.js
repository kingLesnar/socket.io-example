const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.get("/message", (req, res) => res.send("message to socket.io"));
app.get("/", (req, res) => res.send("Welcome to socket.io"));

// io.on("connection", function (socket) {
//   console.log("socket connected");
// });

http.listen(3000, () => console.log("listening on http://localhost:3000"));
let message = "wow";
io.on("connection", function (socket) {
  console.log("socket connected .....");
  socket.on(`${message}`, function (msg) {
    console.log("message: --------- " + msg);
    io.emit("message", msg);
  });

  socket.on("typing", function (message) {
    io.emit("typing", message);
  });
});

io.on("secondConnection", function (socket) {
  console.log("second socket connected .....");
  socket.on("secondMessage", function (msg) {
    console.log("secondMessage: --------- " + msg);
    io.emit("secondMessage", msg);
  });
});
