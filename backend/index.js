const socket = require("./socket");
const web = require("./web");

async function start() {
	socket.start();
	web.start();
}

module.exports = { start };
