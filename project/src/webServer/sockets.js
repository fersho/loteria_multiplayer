const socket = require("socket.io");

function createSocketsEvents(server) {
    // Socket setup
    const io = socket(server);

    const activeUsers = new Set();

    io.on("connection", function (socket) {
        console.log("Made socket connection");

        socket.on("create room", function (userName) {
           
            

            socket.userName = userName;
            activeUsers.add(userName);
            console.log("nuevo user: "+data);
            io.emit("new room", gameName);
            io.emit("new user", [...activeUsers]);
        });

        socket.on("join game", function (data) {
            socket.userId = data;
            activeUsers.add(data);
            console.log("nuevo user: "+data);
            io.emit("new user", [...activeUsers]);
        });

        socket.on("disconnect", () => {
            activeUsers.delete(socket.userId);
            io.emit("user disconnected", socket.userId);
        });

        socket.on("chat message", function (data) {
            io.emit("chat message", data);
        });
        
        socket.on("typing", function (data) {
            socket.broadcast.emit("typing", data);
        });
    });
}
exports.createSocketsEvents = createSocketsEvents;
