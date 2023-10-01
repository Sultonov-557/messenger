start();
async function start() {
	if (document.cookie) {
		const token = document.cookie.split("=")[1];
		const res = await (await sendRequest("http://localhost:8080/verify", "post", { token })).json();
		if (!res.done) {
			window.open("/auth", "_self");
			return;
		}
		const user = res.user;

		const socket = new WebSocket("ws://" + document.domain + ":2668");

		const messages = document.querySelector(".messenger-messages");
		const text = document.querySelector("input");
		const sendButton = document.querySelector("button#send");
		const logoutButton = document.querySelector("button#logout");

		sendButton.onclick = function send() {
			if (text.value != "") {
				socket.send(JSON.stringify({ username: user.username, message: text.value }));
				text.value = "";
			}
		};

		logoutButton.onclick = async function logout() {
			await sendRequest("http://localhost:8080/logout", "post", { token: token });
			document.cookie = "";
			window.open("/auth", "_self");
		};

		socket.addEventListener("message", (ws) => {
			const data = JSON.parse(ws.data);
			const message = document.createElement("div");
			const sender = document.createElement("div");
			sender.className = "sender";
			sender.innerText = data.username;
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
}

async function sendRequest(url, method, body) {
	const res = await fetch(url, { method: method, body: JSON.stringify(body), headers: { "Content-Type": "application/json" } });
	return res;
}
