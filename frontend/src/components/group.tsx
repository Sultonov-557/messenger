"use client";
import { usePathname } from "next/navigation";

interface Props {
	name: string;
	id: string;
}

const Group = ({ name, id }: Props) => {
	const pathname = usePathname();
	const isActive = pathname === `/group/${id}`;

	const handleClick = () => {
		window.location.href = `/group/${id}`;
	};

	return (
		<div
			className={`mx-2 my-1 p-3 rounded-lg cursor-pointer transition-all hover:bg-gray-700 flex items-center ${
				isActive ? "bg-gray-700" : ""
			}`}
			onClick={handleClick}
		>
			<div className="flex-shrink-0 w-10 h-10 rounded-full bg-button flex items-center justify-center text-white font-semibold mr-3 max-sm:mr-0">
				{name.slice(0, 1).toUpperCase()}
			</div>
			<div className="overflow-hidden max-sm:hidden">
				<h3 className="text-base font-medium truncate">{name}</h3>
			</div>
		</div>
	);
};

export default Group;
