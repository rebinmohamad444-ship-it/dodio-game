
const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static("./"));

let players = {};

wss.on("connection", (ws) => {
    const id = Date.now().toString() + Math.floor(Math.random() * 1000);

    players[id] = {
        id,
        x: 20000,
        y: 20000,
        angle: 0,
        name: "Player"
    };

    ws.send(JSON.stringify({
        type: "init",
        id: id
    }));

    ws.on("message", (message) => {
        try {
            const data = JSON.parse(message);

            if (data.type === "update") {
                players[id].x = data.x;
                players[id].y = data.y;
                players[id].angle = data.angle;
                players[id].name = data.name;
            }
        } catch (e) {}
    });

    ws.on("close", () => {
        delete players[id];
    });
});

setInterval(() => {
    const packet = JSON.stringify({
        type: "players",
        players: Object.values(players)
    });

    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(packet);
        }
    });
}, 50);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
