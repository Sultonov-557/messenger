import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CookiesProvider } from "next-client-cookies/server";

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
				<CookiesProvider>{children}</CookiesProvider>
			</body>
		</html>
	);
}
