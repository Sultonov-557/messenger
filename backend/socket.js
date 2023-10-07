const Server = require("ws").WebSocketServer; //importing WebSocketServer package
const db = require("./db"); //importing database package

async function start() {
	await db.connect(); //connecting to database
	const ws = new Server({ port: 2668 }); //creating WebSocket Server

	//adding listener to connection
	ws.on("connection", async (socket) => {
		//getting all messages from database
		const messages = await db.queryAll("SELECT * FROM message");

		//loop for send all messages when someone connected
		for (i in messages) {
			socket.send(JSON.stringify(messages[i]));
		}

		//adding listener for messages
		socket.on("message", async (bufferData) => {
			//converting Buffer data to String
			let stringData = bufferData.toLocaleString();

			//converting stringData to JSON
			const jsonData = JSON.parse(stringData);

			//sending new message to everyone
			broadcast(stringData);

			//inserting new message to database
			await db.query("INSERT INTO message (username, message) VALUES (?, ?)", [jsonData.username, jsonData.message]);
		});
	});

	//function to send message to all users
	function broadcast(message) {
		//loop for send message to all users
		ws.clients.forEach((client) => {
			client.send(message);
		});
	}
}

module.exports = { start };
