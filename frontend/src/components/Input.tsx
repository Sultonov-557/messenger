import { IoSend } from "react-icons/io5";
import { api } from "@/utils/api";
import { useCookies } from "next-client-cookies";
import { FormEvent, useState } from "react";

interface InputProps {
	id: number;
}

export const Input = ({ id }: InputProps) => {
	const cookieStore = useCookies();
	const access_token = cookieStore.get("access_token");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const form = event.target as HTMLFormElement;
		const inputElement = form.elements.namedItem("input") as HTMLInputElement;
		const input = inputElement.value.trim();

		if (!input) return;

		setIsLoading(true);
		setError(null);

		try {
			const response = await api.post(
				"/message",
				{
					text: input,
					group_id: id,
				},
				access_token
			);

			if (!response.success) {
				setError(response.message || "Failed to send message");
				return;
			}

			inputElement.value = "";
		} catch (error) {
			console.error("Failed to send message:", error);
			setError("Failed to send message");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="w-full h-12 flex">
			{error && <div className="text-red-500 text-xs absolute bottom-16">{error}</div>}
			<input
				name="input"
				className="w-full border-none p-2 mr-3 flex-1 bg-foreground text-white focus:outline-none rounded-2xl"
				disabled={isLoading}
				placeholder="Type a message..."
			/>
			<button
				type="submit"
				className="flex justify-center items-center bg-button size-12 text-white rounded-full disabled:opacity-50"
				disabled={isLoading}
			>
				<IoSend fontSize={25} />
			</button>
		</form>
	);
};
