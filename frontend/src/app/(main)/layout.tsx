import dynamic from "next/dynamic";

const Sidebar = dynamic(() => import("@/components/Sidebar"), { ssr: false });

export default function MainLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className="flex w-full h-full flex-row">
			<Sidebar />
			<div className="w-full h-full bg-background flex">{children}</div>
		</main>
	);
}
