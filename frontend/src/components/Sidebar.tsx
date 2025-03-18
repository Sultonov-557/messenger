"use client";
import { useState, useEffect } from "react";
import { api } from "@/utils/api";
import Group from "./group";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCookies } from "next-client-cookies";

export default function Sidebar() {
	const [groups, setGroups] = useState<any[]>([]);
	const [username, setUsername] = useState<string>("");
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [newGroupName, setNewGroupName] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const cookieStore = useCookies();

	useEffect(() => {
		const fetchGroups = async () => {
			try {
				const res = await api.get("/group", {}, cookieStore.get("access_token"));
				if (res.success) {
					setGroups(res.data.data || []);
				}
			} catch (error) {
				console.error("Failed to fetch groups:", error);
			}
		};

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

		fetchGroups();
		fetchProfile();
	}, [cookieStore]);

	const handleLogout = () => {
		cookieStore.remove("access_token");
		cookieStore.remove("refresh_token");
		router.push("/auth");
	};

	const handleCreateGroup = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!newGroupName.trim()) return;

		setIsLoading(true);
		try {
			const res = await api.post("/group", { name: newGroupName.trim() }, cookieStore.get("access_token"));

			if (res.success) {
				setGroups((prev) => [...prev, res.data]);
				setNewGroupName("");
				setShowCreateModal(false);
				router.refresh();
			}
		} catch (error) {
			console.error("Failed to create group:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="w-72 h-full bg-foreground flex flex-col max-sm:w-20">
			{/* Header with create group button */}
			<div className="p-4 border-b border-gray-700 flex justify-between items-center">
				<h2 className="text-xl font-bold max-sm:hidden">Chats</h2>
				<button
					onClick={() => setShowCreateModal(true)}
					className="p-2 bg-button rounded-full hover:bg-opacity-90 transition-all"
					title="Create new group"
				>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
						<path
							fillRule="evenodd"
							d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
							clipRule="evenodd"
						/>
					</svg>
				</button>
			</div>

			{/* Groups list */}
			<div className="flex-1 overflow-y-auto py-2">
				{groups.length > 0 ? (
					groups.map((group) => <Group key={group.id} name={group.name} id={group.id} />)
				) : (
					<div className="text-center py-8 text-gray-400 px-4 max-sm:hidden">
						No conversations yet. Create a new group to start chatting!
					</div>
				)}
			</div>

			{/* Profile section */}
			<div className="p-4 border-t border-gray-700 flex items-center">
				<Link href="/profile">
					<div className="h-10 w-10 rounded-full bg-button flex items-center justify-center text-white font-semibold hover:bg-opacity-90 transition-all">
						{username ? username.slice(0, 1).toUpperCase() : "?"}
					</div>
				</Link>
				<div className="ml-3 flex-1 max-sm:hidden">
					<Link href="/profile" className="font-medium hover:text-button transition-colors">
						{username || "Loading..."}
					</Link>
					<div className="flex space-x-4 mt-1">
						<button
							onClick={handleLogout}
							className="text-sm text-gray-400 hover:text-white transition-colors"
						>
							Log out
						</button>
						<Link href="/profile" className="text-sm text-gray-400 hover:text-white transition-colors">
							Edit profile
						</Link>
					</div>
				</div>
			</div>

			{/* Create group modal */}
			{showCreateModal && (
				<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
					<div className="bg-foreground rounded-lg p-6 w-full max-w-md">
						<h3 className="text-lg font-medium mb-4">Create New Group</h3>
						<form onSubmit={handleCreateGroup}>
							<input
								type="text"
								value={newGroupName}
								onChange={(e) => setNewGroupName(e.target.value)}
								placeholder="Group name"
								className="w-full p-3 rounded-lg bg-background border border-gray-700 focus:border-button focus:ring-1 focus:ring-button focus:outline-none transition-colors text-white mb-4"
								autoFocus
							/>
							<div className="flex justify-end space-x-3">
								<button
									type="button"
									onClick={() => setShowCreateModal(false)}
									className="px-4 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
								>
									Cancel
								</button>
								<button
									type="submit"
									disabled={isLoading || !newGroupName.trim()}
									className="px-4 py-2 bg-button rounded-lg text-white hover:bg-opacity-90 transition-colors disabled:opacity-50"
								>
									{isLoading ? "Creating..." : "Create Group"}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
}
