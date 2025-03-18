"use client";

import { useEffect, useState } from "react";
import { api } from "@/utils/api";
import { useCookies } from "next-client-cookies";

export default function Home() {
	const [username, setUsername] = useState("");
	const cookieStore = useCookies();

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const res = await api.get("/user/profile", {}, cookieStore.get("access_token"));
				if (res.success) {
					setUsername(res.data.username);
				}
			} catch (error) {
				console.error("Failed to fetch profile:", error);
			}
		};

		fetchProfile();
	}, [cookieStore]);

	return (
		<div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
			<div className="max-w-md">
				<div className="h-20 w-20 bg-button rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6">
					{username ? username.slice(0, 1).toUpperCase() : "M"}
				</div>

				<h1 className="text-3xl font-bold mb-3">Welcome to Messenger{username ? `, ${username}` : ""}!</h1>
				<p className="text-gray-400 mb-8">Connect with friends and colleagues through instant messaging.</p>

				<div className="bg-foreground p-5 rounded-xl border border-gray-700">
					<h2 className="text-xl font-semibold mb-4">Get Started</h2>

					<div className="space-y-4">
						<div className="flex items-start text-left">
							<div className="flex-shrink-0 bg-button w-8 h-8 rounded-full flex items-center justify-center mr-3">
								<span>1</span>
							</div>
							<div>
								<p className="text-white">Create a new group</p>
								<p className="text-gray-400 text-sm">
									Click the + button in the sidebar to create a group chat.
								</p>
							</div>
						</div>

						<div className="flex items-start text-left">
							<div className="flex-shrink-0 bg-button w-8 h-8 rounded-full flex items-center justify-center mr-3">
								<span>2</span>
							</div>
							<div>
								<p className="text-white">Select a conversation</p>
								<p className="text-gray-400 text-sm">
									Click on a group in the sidebar to start chatting.
								</p>
							</div>
						</div>

						<div className="flex items-start text-left">
							<div className="flex-shrink-0 bg-button w-8 h-8 rounded-full flex items-center justify-center mr-3">
								<span>3</span>
							</div>
							<div>
								<p className="text-white">Customize your profile</p>
								<p className="text-gray-400 text-sm">
									Click on your avatar to edit your profile information.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
