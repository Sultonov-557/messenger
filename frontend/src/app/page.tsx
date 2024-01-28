import { useState } from "react";

export default async function Home() {
	const messages: { text: string; sender: string }[] = await (await fetch("https://localhost:5000/messages")).json();

	function handleSendMessage() {}
	return (
		<div>
			<div>
				<h1>Welcome to My Chat App</h1>
				<div style={{ border: "1px solid #ccc", padding: "10px", height: "300px", overflowY: "auto" }}>
					{messages.map((message, index) => (
						<div key={index}>
							{message.sender}: {message.text}
						</div>
					))}
				</div>
				<div>
					<input type="text" placeholder="Type your message" />
					<button onClick={handleSendMessage}>Send</button>
				</div>
			</div>
		</div>
	);
}
