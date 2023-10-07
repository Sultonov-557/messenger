const socket = require("./socket"); //importing socket controller
const web = require("./web"); //importing RestApi

async function start() {
	//starting socket and web server
	socket.start();
	web.start();
}

module.exports = { start }; //exporting starter function
