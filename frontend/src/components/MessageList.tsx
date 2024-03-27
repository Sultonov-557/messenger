"use client";
import { useEffect, useState } from "react";
import { api } from "../utils/api";
import { Input } from "./Input";
import { io } from "socket.io-client";
import { useCookies } from "next-client-cookies";

interface Message {
	id: string;
	text: string;
	sender: { username: string };
}

export default function MessageList({ id }: { id: number }) {
	const [messages, setMessages] = useState<Message[]>([]);
	const cookieStore = useCookies();
	const access_token = cookieStore.get("access_token");

	const connection = io("http://localhost:3001", { extraHeaders: { authorization: `bearer ${access_token}` } });

	connection.onAny((ev) => {
		console.log(ev);
	});

	useEffect(() => {
		const fetchMessages = async () => {
			const msgs = await api.get("/message", { group_id: id });

			setMessages(msgs.data.data);
		};

		fetchMessages();
	}, []);

	return (
		<div className="flex flex-col w-full h-full">
			<div className="flex flex-col space-y-4 p-7 w-full h-full">
				{messages.map((msg) => (
					<div key={msg.id} className="w-auto px-2 py-1 rounded-2xl h-auto bg-foreground">
						<p className="font-bold ">{msg.sender.username}</p>
						<p className="mt-1 pr-5">{msg.text}</p>
					</div>
				))}
			</div>
			<div className="w-full h-16 px-7 flex justify-self-end">
				<Input id={id} />
			</div>
		</div>
	);
}