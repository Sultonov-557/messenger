const socket = new WebSocket("ws://localhost:2668");

const message = document.querySelector("span");
const text = document.querySelector("input");
const send = document.querySelector("button");

send.addEventListener("click", () => {
	if (text.value != "") {
		socket.send(text.value);
		text.value = "";
	}
});

socket.addEventListener("message", (ws) => {
	message.innerText += ws.data + "\n";
});
