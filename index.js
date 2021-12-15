var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var fs = require("fs");
var path = require("path");
var http = require("http").Server(app);
var io = require("socket.io")(http);

// fix issue in long disconnecting times in browser

// interval checks if player is connected every 1 seconds
// io.set('heartbeat interval', 1000)
// if player disconnected for 5 second, they booted
// io.set('heartbeat timeout', 5000)

// Get static files (js css images)
app.use(express.static(path.join(__dirname, "/assets")));
app.use(express.static(path.join(__dirname, "/suit-game/assets")));
app.use(express.static(path.join(__dirname, "/tic-tac-toe/assets")));
app.use(express.static(path.join(__dirname, "/snake-game/assets")))
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

// Random, create private, join private
var gameType;
function getGameType(gameQuery) {
  for (key in gameQuery) {
    gameType = key.toString();
  }
}

// Get Home | Landing Page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Get Suit Game
app.get("/suit", (req, res) => {
  res.sendFile(__dirname + "/suit-game/index.html");
});

// Get TicTacToe Game
app.get("/tic-tac-toe", (req, res) => {
  res.sendFile(__dirname + "/tic-tac-toe/index.html");
});
app.get("/tic-tac-toe/menu", (req, res) => {
  res.sendFile(__dirname + "/tic-tac-toe/menu.html");
});
app.get("/tic-tac-toe/menu/join", (req, res) => {
  res.sendFile(__dirname + "/tic-tac-toe/join.html");
});
app.get("/tic-tac-toe/menu/game", (req, res) => {
  gameQuery = req.query;
  getGameType(gameQuery);
  res.sendFile(__dirname + "/tic-tac-toe/game.html");
});

// Get Snake Game
app.get("/snake", (req, res) => {
  res.sendFile(__dirname + "/snake-game/menu.html")
})
app.get("/snake/game", (req, res) => {
  res.sendFile(__dirname + "/snake-game/index.html")
})
app.get("/snake/game/guide", (req, res) => {
  res.sendFile(__dirname + "/snake-game/guide/guide.html")
})

////////////////////////////////////////////////
// Below is the function for tic-tac-toe game //
////////////////////////////////////////////////
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to set letter each player will get
function assignLetter() {
  number = getRandomInt(0, 1);
  if (number == 0) {
    players = ["X", "O"];
  } else if (number == 1) {
    players = ["O", "X"];
  }
  return players;
}

// Function to set who will start the game
function assignTurn() {
  number = getRandomInt(0, 1);
  if (number == 0) {
    turn = [true, false];
  } else if (number == 1) {
    turn = [false, true];
  }
  return turn;
}

// Function when you don't have the playerData and you only have the player Id.
// Return whole player data
function findOtherPlayer(playerId) {
  for (var room in gameRooms) {
    for (var i = 0; i < gameRooms[room].length; i++) {
      gameRooms[room][i].id;
      if (playerId == gameRooms[room][i].id) {
        return gameRooms[room][i];
      }
    }
  }
}

// Function when you have the playerData
function getOtherPlayer(player) {
  var playerData = gameRooms[player.roomId];

  console.log("\nGame Rooms:");
  console.log(gameRooms);

  console.log("\nRoom ID:");
  console.log(player.roomId);

  var otherPlayer;

  if (playerData[0].playerNumber == player.playerNumber) {
    otherPlayer = playerData[1];
  } else if (playerData[1].playerNumber == player.playerNumber) {
    otherPlayer = playerData[0];
  }

  return otherPlayer;
}

// Function to find player room
function findPlayerRoom(playerId) {
  for (var room in gameRooms) {
    for (var i = 0; i < gameRooms[room].length; i++) {
      // Get the game rooms id
      gameRooms[room][i].id;
      if (playerId == gameRooms[room][i].id) {
        return room;
      }
    }
  }

  // Return when the player doesn't got any room
  return false;
}

// Linked to assignTurn() function, this func is used to switch wo starts the game at every new game
function randomizePlayerTurn(playerData) {
  turn = assignTurn();

  playerData[0].turn = turn[0];
  playerData[1].turn = turn[1];

  return playerData;
}

// Function to get room id
function getRoomId() {
  return getRandomInt(1, 10000);
}

// Function to get starting value
function initStartValues() {
  letters = assignLetter();
  turn = assignTurn();
  playerData = [];
  usersOn = 1;
  roomId = getRoomId();

  valueList = {
    letters: letters,
    turn: turn,
    playerData: playerData,
    usersOn: usersOn,
    roomId: roomId,
  };

  return valueList;
}

// Function to remove player from room(maybe menu button)
function removePlayerFromRoom(playerId) {
  for (var i = 0; i < playerData.length; i++) {
    if (playerId == playerData[i].id) {
      playerData.splice(i, 1);
      return;
    }
  }
}

randomGame = initStartValues();

gameRooms = {};

// Multiplayer connection
io.on("connection", function (socket) {
  //console.log("\nConnection")

  if (gameType == "random") {
    var joinInfo = {
      id: socket.id,
      roomId: randomGame.roomId,
      playerNumber: randomGame.usersOn,
      letter: randomGame.letters[randomGame.usersOn - 1],
      turn: randomGame.turn[randomGame.usersOn - 1],
      roomType: "random",
    };

    // Push info to the playerData
    randomGame.playerData.push(joinInfo);

    randomGame.usersOn++;

    // Client side
    socket.emit("playersJoined", joinInfo);

    // Prevent player more than 2, if alrd two players, start the game
    if (randomGame.usersOn > 2) {
      gameRooms[randomGame.roomId] = randomGame.playerData;
      io.to(randomGame.playerData[0].id).emit("gameStart");
      io.to(randomGame.playerData[1].id).emit("gameStart");
      randomGame = initStartValues();
    }
  } else if (gameType == "createPrivate") {
    var privateGame = initStartValues();
    var joinInfo = {
      id: socket.id,
      roomId: privateGame.roomId,
      playerNumber: privateGame.usersOn,
      letter: privateGame.letters[privateGame.usersOn - 1],
      turn: privateGame.turn[privateGame.usersOn - 1],
      roomType: "private",
      gameValues: privateGame,
    };
    socket.emit("playersJoined", joinInfo);

    gameRooms[privateGame.roomId] = [joinInfo];
  } else if (gameType == "gameCode") {
    var gameRoomId = Number(gameQuery.gameCode);
    if (gameRooms[gameRoomId] == undefined) {
      socket.emit("gameNotExist", gameRoomId);
    } else {
      var gameValues = gameRooms[gameRoomId][0].gameValues;

      gameValues.usersOn++;

      var joinInfo = {
        id: socket.id,
        roomId: gameValues.roomId,
        playerNumber: gameValues.usersOn,
        letter: gameValues.letters[gameValues.usersOn - 1],
        turn: gameValues.turn[gameValues.usersOn - 1],
        roomType: "private",
      };

      gameRooms[gameRoomId].push(joinInfo);

      socket.emit("playersJoined", joinInfo);

      io.to(gameRooms[gameRoomId][0].id).emit("gameStart");
      io.to(gameRooms[gameRoomId][1].id).emit("gameStart");
    }
  }

  socket.on("winner", function (player) {
    var otherPlayer = getOtherPlayer(player);

    io.to(player.id).emit("winnerDetermined", {
      youWon: true,
      winningLetter: player.letter,
    });
    io.to(otherPlayer.id).emit("winnerDetermined", {
      youWon: false,
      winningLetter: player.letter,
    });
  });

  socket.on("tie", function (roomId) {
    io.to(gameRooms[roomId][0].id).emit("tie");
    io.to(gameRooms[roomId][1].id).emit("tie");
  });

  socket.on("playedMove", function (movePlayed) {
    var otherPlayer = getOtherPlayer(movePlayed.player);

    var playerRoom = movePlayed.player.roomId;

    info = {
      boxPlayed: movePlayed.box,
      letter: movePlayed.player.letter,
    };
    io.to(otherPlayer.id).emit("yourTurn", info);
    io.to(movePlayed.player.id).emit("otherTurn");
  });

  playersRematch = 0;

  socket.on("restartGame", function (roomId) {
    playersRematch++;
    if (playersRematch == 2) {
      newPlayerData = randomizePlayerTurn(gameRooms[roomId]);
      io.to(gameRooms[roomId][0].id).emit("gameRestarted", newPlayerData[0]);
      io.to(gameRooms[roomId][1].id).emit("gameRestarted", newPlayerData[1]);
      playersRematch = 0;
    }
  });

  // Disconnect Checking
  socket.on("disconnect", function () {
    //console.log("\nDisconnect")

    removePlayerFromRoom(socket.id);

    // Check if player alone and doesn't got any room
    if (!findPlayerRoom(socket.id)) {
      randomGame = initStartValues();
    } else if (!(gameRooms[findPlayerRoom(socket.id)] == undefined)) {
      if (!(gameRooms[findPlayerRoom(socket.id)].length == 1)) {
        var otherPlayerInfo = findOtherPlayer(socket.id);

        if (otherPlayerInfo != null) {
          var otherPlayer = getOtherPlayer(otherPlayerInfo);
          if (otherPlayer) {
            io.to(otherPlayer.id).emit("playerDisconnect");
          }
        }
      }
    }
  });
});

// Server Configuration
var port = process.env.PORT || 8080;

http.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
