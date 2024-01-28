"use client";
import { Button, TextField } from "@mui/material";
import axios from "axios";

export default async function Home() {
	const messages: any = await axios.get("http://localhost:5000/api/message");
	let text = "";
	async function sendMessage() {
		await axios.post("http://localhost:5000/api/message", {
			text,
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
					<TextField id="input" label="Message" variant="standard" onChange={(e) => (text = e.target.value)} />
					<Button variant="outlined" onClick={sendMessage}>
						Send
					</Button>
				</div>
			</div>
		</div>
	);
}
