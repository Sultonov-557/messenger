"use client";
import { api } from "@/utils/api";
import { useCookies } from "next-client-cookies";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
	const cookieStore = useCookies();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setLoading(true);
		setError("");

		const formData = new FormData(event.currentTarget);
		const username = formData.get("username") as string;
		const password = formData.get("password") as string;

		try {
			const response = await api.post("/user/login", {
				username,
				password,
			});

			if (response.success) {
				cookieStore.set("access_token", response.data.access_token);
				cookieStore.set("refresh_token", response.data.refresh_token);
				window.location.href = "../";
			} else {
				setError("Invalid username or password");
			}
		} catch (error) {
			setError("Something went wrong. Please try again.");
			console.error("Login failed", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen w-full flex flex-col items-center justify-center bg-background px-4 py-12">
			<div className="w-full max-w-md mx-auto">
				<div className="text-center mb-8">
					<h1 className="text-4xl font-bold text-white mb-2">Welcome Back</h1>
					<p className="text-gray-400">Sign in to continue to Messenger</p>
				</div>

				<div className="bg-foreground p-8 rounded-xl shadow-lg border border-gray-700">
					{error && (
						<div className="mb-4 p-3 bg-red-900/30 border border-red-800 text-red-200 rounded-lg text-sm">
							{error}
						</div>
					)}

					<form className="space-y-5" onSubmit={handleSubmit}>
						<div>
							<label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
								Username
							</label>
							<input
								id="username"
								name="username"
								type="text"
								required
								placeholder="Enter your username"
								className="w-full p-3 rounded-lg bg-background border border-gray-700 focus:border-button focus:ring-1 focus:ring-button focus:outline-none transition-colors text-white"
							/>
						</div>

						<div>
							<label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
								Password
							</label>
							<input
								id="password"
								name="password"
								type="password"
								required
								placeholder="Enter your password"
								className="w-full p-3 rounded-lg bg-background border border-gray-700 focus:border-button focus:ring-1 focus:ring-button focus:outline-none transition-colors text-white"
							/>
						</div>

						<button
							type="submit"
							disabled={loading}
							className="w-full py-3 px-4 bg-button hover:bg-opacity-90 transition-all duration-200 text-white font-medium rounded-lg flex items-center justify-center"
						>
							{loading ? <span>Signing in...</span> : <span>Sign In</span>}
						</button>
					</form>

					<div className="mt-6 text-center">
						<p className="text-gray-400 text-sm">
							Don't have an account?{" "}
							<Link href="/auth/register" className="text-button hover:underline">
								Create an account
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
