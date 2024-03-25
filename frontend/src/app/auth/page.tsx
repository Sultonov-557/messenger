import Button from "@/components/ui/button";

export default function Auth() {
	return (
		<div className="w-full h-full flex justify-center items-center">
			<div className="size-96 bg-slate-500">
				<Button className="w-60 h-36 bg-button ">Login</Button>
				<Button className="w-60 h-36 bg-button ">Register</Button>
			</div>
		</div>
	);
}
