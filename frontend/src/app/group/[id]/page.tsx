"use client";
import MessageList from "@/components/MessageList";
import { api } from "@/utils/api";
import { useParams } from "next/navigation";

export default async function GroupPage() {
	const { id } = useParams();

	const group = await api.get(`/group/${id}`);

	return (
		<div className="w-full h-full">
			<h1>{group.name}</h1>

			<MessageList id={group.id} />
		</div>
	);
}
