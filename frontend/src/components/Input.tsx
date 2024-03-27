import { IoSend } from "react-icons/io5";
import { api } from "../utils/api";
import { useCookies } from "next-client-cookies";

export const Input = ({ id }: { id: number }) => {
	const cookieStore = useCookies();
	const access_token = cookieStore.get("access_token");
	const handleSubmit = async (event: any) => {
		event.preventDefault();

		const input = event.target.elements.input.value;

		await api.post(
			"/message",
			{
				text: input,
				group_id: id,
			},
			access_token
		);

		event.target.elements.input.value = "";
	};

	return (
		<form onSubmit={handleSubmit} className="w-full h-12 flex">
			<input name="input" className=" w-full border-none p-2 mr-3 flex-1 bg-foreground text-white focus:outline-none rounded-2xl" />
			<button type="submit" className="flex justify-center items-center bg-button size-12 text-white rounded-full">
				<IoSend fontSize={25} />
			</button>
		</form>
	);
};
