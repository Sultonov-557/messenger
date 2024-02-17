import React from "react";

export default function Button({ children }: { children: React.ReactNode }) {
	return (
		<div className="w-16 h-16 m-1 text-white rounded-3xl flex items-center justify-center hover:bg-green-400 hover:rounded-xl duration-700 ease-in-out">
			<span className="align-middle">{children}</span>
		</div>
	);
}
