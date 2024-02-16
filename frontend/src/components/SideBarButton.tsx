import React from "react";

export default function SideBarButton({ children }: { children: React.ReactNode }) {
	return (
		<div className="bg-gray-800 text-green-400 w-16 h-16 m-1 rounded-3xl flex items-center justify-center  hover:bg-green-400 hover:text-white hover:rounded-xl duration-700 ease-in-out">
			<span className="align-middle">{children}</span>
		</div>
	);
}
