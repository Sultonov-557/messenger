"use client";
import { api } from "@/utils/api";
import { useCookies } from "next-client-cookies";

export default function RegisterPage() {
	const cookieStore = useCookies();
	const handleSubmit = async (event: any) => {
		event.preventDefault();

		const username = event.target.username.value;
		const password = event.target.password.value;

		const response = await api.post("/user/register", {
			username,
			password,
		});

		if (response.success) {
			cookieStore.set("access_token", response.data.access_token);
			cookieStore.set("refresh_token", response.data.refresh_token);

			window.location.href = "../";
		} else {
			console.error("Registration failed");
			console.log(response);
			alert("Registration failed");
		}
	};

	return (
		<div className="h-screen flex items-center">
			<div className="max-w-md mx-auto p-5 rounded-md shadow-md text-center">
				<h1 className="text-2xl font-medium text-white">Register</h1>
				<form className="p-6 rounded-lg" onSubmit={handleSubmit}>
					<input name="username" type="username" placeholder="Username" className="w-full p-2 rounded mb-4 bg-background border-2 border-foreground focus:outline-none" />
					<input name="password" type="password" placeholder="Password" className="w-full p-2 rounded mb-4 bg-background border-2 border-foreground focus:outline-none" />
					<button type="submit" className="bg-button text-white p-2 rounded w-full">
						Register
					</button>
				</form>
			</div>
		</div>
	);
}
