if (document.cookie) {
	const token = document.cookie.split("=")[1];

	const socket = new WebSocket("ws://" + document.domain + ":2668");

	const messages = document.querySelector(".messenger-messages");
	const text = document.querySelector("input");

	function send() {
		if (text.value != "") {
			socket.send(JSON.stringify({ message: text.value }));
			text.value = "";
		}
	}

	socket.addEventListener("message", (ws) => {
		const data = JSON.parse(ws.data);
		const message = document.createElement("div");
		const sender = document.createElement("div");
		sender.className = "sender";
		sender.innerText = data.name;
		const text = document.createElement("div");
		text.className = "message-text";
		text.innerText = data.message;
		message.appendChild(sender);
		message.appendChild(text);
		message.className = "messenger-message";
		messages.appendChild(message);
	});
} else {
	window.open("/auth", "_self");
}
