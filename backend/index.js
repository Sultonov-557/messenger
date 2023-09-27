const Server = require("ws").WebSocketServer;

async function start() {
	const ws = new Server({ port: 2668 });

	ws.on("connection", async (socket) => {
		socket.on("message", (data) => {
			data = data.toLocaleString();
			broadcast(data);
		});
	});

	function broadcast(message) {
		ws.clients.forEach((client) => {
			client.send(message);
		});
	}
}

module.exports = { start };
