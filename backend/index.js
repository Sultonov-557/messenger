const WebSocket = require("websocket").server;
const http = require("http");
const Redis = require("redis");

async function start() {
	const server = http.createServer();
	const db = {};

	const ws = new WebSocket({ httpServer: server, autoAcceptConnections: true });

	const redis = Redis.createClient({
		socket: {
			host: "redis-17940.c10.us-east-1-3.ec2.cloud.redislabs.com",
			port: 17940,
		},
		password: "z5572668",
	});

	redis.connect();

	if ((await redis.get("message")) == undefined) {
		console.log("messages init");
		redis.set("message", "[]");
		db.message = [];
	} else {
		db.message = JSON.parse(await redis.get("message"));
	}

	setInterval(async () => {
		redis.set("message", JSON.stringify(db.message));
		console.log("saved");
	}, 30000);

	server.listen(2668);

	ws.on("connect", async (socket) => {
		for (i in db.message) {
			socket.send(db.message[i]);
		}

		socket.on("message", (data) => {
			db.message.push(data.utf8Data);
			socket.send(data.utf8Data);
		});
	});
}

module.exports = { start };
