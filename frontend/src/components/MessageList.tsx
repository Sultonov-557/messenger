"use client";
import { useEffect, useState, useRef } from "react";
import { api } from "@/utils/api";
import { Input } from "./Input";
import { io, Socket } from "socket.io-client";
import { useCookies } from "next-client-cookies";
import { env } from "@/utils/env.config";

interface Message {
	id: string;
	text: string;
	sender: { username: string };
}

interface GroupInfo {
	joined: boolean;
	name?: string;
}

export default function MessageList({ id }: { id: number }) {
	const [messages, setMessages] = useState<Message[]>([]);
	const [group, setGroup] = useState<GroupInfo | undefined>();
	const cookieStore = useCookies();
	const access_token = cookieStore.get("access_token");
	const socketRef = useRef<Socket | null>(null);
	const messageListRef = useRef<HTMLDivElement | null>(null);

	// Extract the base URL from the API URL
	const socketUrl = env.BACKEND_URL.split("/api")[0] || "http://localhost:3001";

	function scrollToBottom() {
		if (!messageListRef.current) return;
		messageListRef.current.scrollIntoView({ behavior: "smooth" });
	}

	useEffect(() => {
		// Initialize socket connection
		socketRef.current = io(socketUrl, {
			extraHeaders: { authorization: `bearer ${access_token}` },
		});

		// Set up event listener
		socketRef.current.on("create_message", (data: Message) => {
			setMessages((prevMessages) => [...prevMessages, data]);
			scrollToBottom();
		});

		// Clean up on unmount
		return () => {
			if (socketRef.current) {
				socketRef.current.disconnect();
			}
		};
	}, [access_token, socketUrl]);

	useEffect(() => {
		const fetchMessages = async () => {
			try {
				const msgs = await api.get("/message", { group_id: id, limit: 50 }, access_token);
				const group_ = await api.get(`/group/${id}`, {}, access_token);

				if (msgs.data && msgs.data.data) {
					setMessages(msgs.data.data);
				}

				if (group_.data) {
					setGroup(group_.data);
				}

				scrollToBottom();
			} catch (error) {
				console.error("Error fetching messages:", error);
			}
		};

		fetchMessages();
	}, [id, access_token]);

	return (
		<div className="flex flex-col w-full h-full">
			<div className="flex flex-col space-y-4 p-7 w-full h-full overflow-y-scroll" ref={messageListRef}>
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
								onClick={async () => {
									try {
										await api.post(`/group/join/${id}`, {}, access_token);
										setGroup({ ...group, joined: true });
									} catch (error) {
										console.error("Error joining group:", error);
									}
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
