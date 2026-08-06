
let socket = null;
let myPlayerId = null;
let onlinePlayers = {};

function connectServer() {
const wsUrl = location.origin.replace("http", "ws");
socket = new WebSocket(wsUrl);

socket.onopen = () => {
    console.log("Connected to dod.io server");
};

socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.type === "init") {
        myPlayerId = data.id;
        console.log("My ID:", myPlayerId);
    }

    if (data.type === "players") {
        onlinePlayers = {};

        data.players.forEach(p => {
            if (p.id !== myPlayerId) {
                onlinePlayers[p.id] = p;
            }
        });
    }
};

socket.onclose = () => {
    console.log("Disconnected from server");

    setTimeout(() => {
        connectServer();
    }, 2000);
};

}

function sendPlayerUpdate() {
if (!socket || socket.readyState !== WebSocket.OPEN) return;

socket.send(JSON.stringify({
    type: "update",
    x: player.x,
    y: player.y,
    angle: player.angle,
    name: document.getElementById("playerName").value || "Player"
}));

}

function drawOnlinePlayers() {
Object.values(onlinePlayers).forEach(p => {
ctx.save();

    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle);

    ctx.fillStyle = "#9b59b6";

    ctx.beginPath();
    ctx.moveTo(60, 0);
    ctx.lineTo(-10, -22);
    ctx.lineTo(-22, 0);
    ctx.lineTo(-10, 22);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 18px Arial";
    ctx.textAlign = "center";
    ctx.fillText(p.name, p.x, p.y - 40);
});

}

connectServer();
