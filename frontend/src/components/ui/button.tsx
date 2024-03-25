import React from "react";

export default function Button({ children, className }: { children: React.ReactNode; className?: string }) {
	return <div className={`${className} flex justify-center items-center m-5 h-14`}>{children}</div>;
}
