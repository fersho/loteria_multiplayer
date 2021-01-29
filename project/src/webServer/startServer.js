const express = require("express");
const socket = require("socket.io");
var path = require('path');
var mongoManagerClass = require('./../mongo/mongoManager.js').MongoManager;
var createServices = require('./services.js').createServices;
var createSocketsEvents = require('./sockets.js').createSocketsEvents;

var mongoManager = new mongoManagerClass();

// App setup
const PORT = 3000;
const app = express();
createServices(app);
mongoManager.createDb();
const server = app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
// Static files
app.use(express.static("src/client"));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../client/views/index.html'));
});
createSocketsEvents(server);

// app.get('/new-game', (req, res) => {
//   res.sendFile(path.resolve(__dirname + '/../client/views/new_game.html'));
// });

// app.get('/game', (req, res) => {
//   res.sendFile(path.resolve(__dirname + '/../client/views/game.html'));
// });


