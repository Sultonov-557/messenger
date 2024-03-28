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
	const [group, setGroup] = useState<{ joined: boolean }>();
	const cookieStore = useCookies();
	const access_token = cookieStore.get("access_token");

	const connection = io("http://localhost:3001", { extraHeaders: { authorization: `bearer ${access_token}` } });

	let messageListEl: HTMLDivElement | null;

	function scrollToBottom() {
		if (!messageListEl) return;
		messageListEl.scrollIntoView({ behavior: "smooth" });
	}

	connection.on("create_message", (data: Message) => {
		const msgs = JSON.parse(JSON.stringify(messages));

		msgs.push(data);
		setMessages(msgs);
		scrollToBottom();
	});

	useEffect(() => {
		const fetchMessages = async () => {
			const msgs = await api.get("/message", { group_id: id, limit: 50 }, access_token);
			const group_ = await api.get(`/group/${id}`, {}, access_token);
			setGroup(group_.data);

			setMessages(msgs.data.data);
			scrollToBottom();
		};

		fetchMessages();
	}, []);

	return (
		<div className="flex flex-col w-full h-full">
			<div
				className="flex flex-col space-y-4 p-7 w-full h-full overflow-y-scroll"
				ref={(el) => {
					messageListEl = el;
				}}
			>
				{messages.map((msg) => (
					<div key={msg.id} className="w-auto px-2 py-1 rounded-2xl h-auto bg-foreground">
						<p className="font-bold ">{msg.sender.username}</p>
						<p className="mt-1 pr-5">{msg.text}</p>
					</div>
				))}
			</div>
			<div className="w-full h-16 px-7 flex justify-self-end">
				{(() => {
					if (group?.joined) {
						return <Input id={id} />;
					} else {
						return (
							<button
								className="bg-button hover:bg-button-hover w-full text-white font-bold py-2 px-4 rounded"
								onClick={async (event) => {
									await api.post(`/group/join/${id}`, {}, access_token);
									setGroup({ joined: true });
								}}
							>
								Join
							</button>
						);
					}
				})()}
			</div>
		</div>
	);
}
