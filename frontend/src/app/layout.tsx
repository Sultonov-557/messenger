import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CookiesProvider } from "next-client-cookies/server";
import dynamic from "next/dynamic";

const Sidebar = dynamic(() => import("@/components/Sidebar"), { ssr: false });

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Messenger App",
	description: "A real-time messaging application",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className + " bg-background w-screen h-screen text-white overflow-hidden"}>
				<CookiesProvider>
					<main className="flex w-full h-full flex-row">
						<Sidebar />
						<div className="w-full h-full bg-background flex">{children}</div>
					</main>
				</CookiesProvider>
			</body>
		</html>
	);
}
