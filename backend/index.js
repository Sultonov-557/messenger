const Server = require("ws").WebSocketServer;
const db = require("./db");

async function start() {
	const ws = new Server({ port: 2668 });

	ws.on("connection", async (socket) => {
		socket.on("message", (data) => {
			data = data.toLocaleString();
			db.set("message", Date.now(), data);
			broadcast(data);
		});
	});

	function broadcast(message) {
		ws.clients.forEach((client, socket) => {
			client.send(message);
		});
	}
}

module.exports = { start };
