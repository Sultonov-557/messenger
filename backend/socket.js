const Server = require("ws").WebSocketServer;
const db = require("./db");

async function start() {
	await db.start();
	const ws = new Server({ port: 2668 });

	ws.on("connection", async (socket) => {
		const messages = await db.queryAll("SELECT * FROM message");
		for (i in messages) {
			socket.send(JSON.stringify(messages[i]));
		}
		socket.on("message", async (data) => {
			data = data.toLocaleString();
			const message = JSON.parse(data);
			broadcast(data);
			await db.query("INSERT INTO message (username, message) VALUES (?, ?)", [message.username, message.message]);
		});
	});

	function broadcast(message) {
		ws.clients.forEach((client) => {
			client.send(message);
		});
	}
}

module.exports = { start };
