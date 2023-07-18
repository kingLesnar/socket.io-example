const { Socket } = require("socket.io");

const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.get("/message", (req, res) => res.send("message to socket.io"));
app.get("/", (req, res) => res.send("Welcome to socket.io"));

// io.on("connection", function (socket) {
//   console.log("socket connected");
// });

http.listen(3000, () => console.log("listening on http://localhost:3000"));
let message = "GameStarted";
io.on("connection", function (socket) {
  let players = {};
  const Questions = {
    data: [
      {
        id: 6549,
        question:
          "The planets are kept in motion in their respective orbits by gravitation and centrifugal force",
        option_1: "TRUE",
        option_2: "FALSE",
        option_3: "",
        option_4: "",
        answer: "TRUE",
        content_url: null,
        import_id: 1,
        cat_id: 8,
        type: 2,
      },
      {
        id: 3453,
        question: "Baahubali star Rana Daggubati has a younger sister",
        option_1: "",
        option_2: "",
        option_3: "TRUE",
        option_4: "FALSE",
        answer: "TRUE",
        content_url: null,
        import_id: 1,
        cat_id: 8,
        type: 2,
      },
      {
        id: 3454,
        question: "Baahubali star Prabhas is officially married",
        option_1: "FALSE",
        option_2: "TRUE",
        option_3: "",
        option_4: "",
        answer: "FALSE",
        content_url: null,
        import_id: 1,
        cat_id: 8,
        type: 2,
      },
      {
        id: 3455,
        question:
          "Salman Khan directed and acted in the quarantine video single Tere Bina",
        option_1: "TRUE",
        option_2: "FALSE",
        option_3: "",
        option_4: "",
        answer: "TRUE",
        content_url: null,
        import_id: 1,
        cat_id: 8,
        type: 2,
      },
      {
        id: 3456,
        question:
          "Salman Khan-directed quarantine video single Tere Bina features Katrina Kaif as female lead",
        option_1: "",
        option_2: "TRUE",
        option_3: "FALSE",
        option_4: "",
        answer: "FALSE",
        content_url: null,
        import_id: 1,
        cat_id: 8,
        type: 2,
      },
    ],
  };
  let score = 0;
  console.log("socket connected .....", socket.id);
  socket.on(message, function (player) {
    players[socket.id] = player;
    // players[socket.id].Questions = Questions.data;

    console.log(
      "Player " + player.name + " with id: " + socket.id + " has joined.",
    );

    io.emit("Questions", Questions);
  });

  socket.on("GameEnded", function (GameEnded) {
    players[socket.id] = GameEnded;

    score = GameEnded.score;
    console.log("scoreeeeeeee", GameEnded.GameEnded.score);
  });
  socket.on("userLeft", function (data) {
    console.log(`this user  has left the game`);
    console.log(`this user ${data.name} has left the game`);
    // io.emit("UserLeft", `this user ${data.name} has left the game`);
  });
});

// --------------------------------------------------------------------
