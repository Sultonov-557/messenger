"use client";
import MessageList from "@/components/MessageList";
import { api } from "@/utils/api";
import { useCookies } from "next-client-cookies";
import { useParams } from "next/navigation";

export default async function GroupPage() {
	const { id } = useParams();

	

	return (
		<div className="w-full h-full">
			<MessageList id={+id} />
		</div>
	);
}
