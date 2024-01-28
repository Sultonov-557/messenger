"use client";
import axios from "axios";

export default async function Home() {
	const messages: any = await axios.get("http://localhost:5000/api/message");
	async function sendMessage() {
		const input = document.querySelector("input");
		await axios.post("http://localhost:5000/api/message", {
			text: input?.value,
		});
	}

	return (
		<div>
			<div>
				<h1>Welcome to My Chat App</h1>
				<div style={{ border: "1px solid #ccc", padding: "10px", height: "300px", overflowY: "auto" }}>
					{messages.data.data.data.map((message: any, index: number) => (
						<div key={index}>
							{message.sender}: {message.text}
						</div>
					))}
				</div>
				<div>
					<input id="input" type="text" placeholder="Type your message" />
					<button onClick={sendMessage}>Send</button>
				</div>
			</div>
		</div>
	);
}
