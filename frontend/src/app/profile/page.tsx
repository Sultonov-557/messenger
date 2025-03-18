"use client";

import { useState, useEffect } from "react";
import { api } from "@/utils/api";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
	const cookieStore = useCookies();
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);
	const [profile, setProfile] = useState({
		username: "",
		bio: "",
	});

	useEffect(() => {
		const fetchProfile = async () => {
			setLoading(true);
			try {
				const res = await api.get("/user/profile", {}, cookieStore.get("access_token"));
				if (res.success) {
					setProfile({
						username: res.data.username,
						bio: res.data.bio || "",
					});
				} else {
					setError("Failed to load profile");
				}
			} catch (error) {
				console.error("Failed to fetch profile:", error);
				setError("Failed to load profile");
			} finally {
				setLoading(false);
			}
		};

		fetchProfile();
	}, [cookieStore]);

	const handleUpdateProfile = async (e: React.FormEvent) => {
		e.preventDefault();
		setSaving(true);
		setError("");
		setSuccess(false);

		try {
			const res = await api.put("/user/profile", { bio: profile.bio }, cookieStore.get("access_token"));

			if (res.success) {
				setSuccess(true);
			} else {
				setError("Failed to update profile");
			}
		} catch (error) {
			console.error("Failed to update profile:", error);
			setError("Failed to update profile");
		} finally {
			setSaving(false);
		}
	};

	return (
		<div className="w-full p-6 max-w-2xl mx-auto">
			<div className="mb-8">
				<h1 className="text-3xl font-bold mb-2">My Profile</h1>
				<p className="text-gray-400">View and edit your profile information</p>
			</div>

			{loading ? (
				<div className="flex justify-center py-10">
					<div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-button"></div>
				</div>
			) : (
				<div className="bg-foreground p-6 rounded-xl shadow-lg border border-gray-700">
					{error && (
						<div className="mb-6 p-3 bg-red-900/30 border border-red-800 text-red-200 rounded-lg text-sm">
							{error}
						</div>
					)}

					{success && (
						<div className="mb-6 p-3 bg-green-900/30 border border-green-800 text-green-200 rounded-lg text-sm">
							Profile updated successfully!
						</div>
					)}

					<form onSubmit={handleUpdateProfile} className="space-y-6">
						<div className="flex flex-col sm:flex-row items-center mb-6">
							<div className="h-24 w-24 rounded-full bg-button flex items-center justify-center text-white text-4xl font-semibold mb-4 sm:mb-0 sm:mr-6">
								{profile.username.slice(0, 1).toUpperCase()}
							</div>
							<div>
								<h2 className="text-xl font-semibold">{profile.username}</h2>
								<p className="text-gray-400 text-sm">Username cannot be changed</p>
							</div>
						</div>

						<div>
							<label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-1">
								Bio
							</label>
							<textarea
								id="bio"
								rows={4}
								value={profile.bio}
								onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
								placeholder="Write something about yourself..."
								className="w-full p-3 rounded-lg bg-background border border-gray-700 focus:border-button focus:ring-1 focus:ring-button focus:outline-none transition-colors text-white"
							/>
						</div>

						<div className="flex justify-end space-x-3">
							<button
								type="button"
								onClick={() => router.back()}
								className="px-4 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
							>
								Cancel
							</button>
							<button
								type="submit"
								disabled={saving}
								className="px-4 py-2 bg-button rounded-lg text-white hover:bg-opacity-90 transition-colors disabled:opacity-50"
							>
								{saving ? "Saving..." : "Save Changes"}
							</button>
						</div>
					</form>
				</div>
			)}
		</div>
	);
}
