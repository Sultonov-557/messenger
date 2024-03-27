"use client";
import { useEffect, useState } from "react";
import { api } from "../utils/api";

interface Message {
	id: string;
	text: string;
	user: string;
}

export default function MessageList({ id }: { id: number }) {
	const [messages, setMessages] = useState<Message[]>([]);

	useEffect(() => {
		const fetchMessages = async () => {
			const msgs = await api.get("/message", { group_id: id });

			setMessages(msgs.data.data);
		};

		fetchMessages();
	}, []);

	return (
		<div>
			{messages.map((msg) => (
				<div key={msg.id}>
					<p>{msg.text}</p>
					<p>- {msg.user}</p>
				</div>
			))}
		</div>
	);
}
