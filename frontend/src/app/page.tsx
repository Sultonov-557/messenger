"use client";
import { Groups } from "@/components/groups";

export default function Home() {
	return (
		<main className="flex w-screen h-screen flex-row">
			<Groups></Groups>
			<div className="w-full h-full bg-background"></div>
		</main>
	);
}
