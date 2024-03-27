import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CookiesProvider } from "next-client-cookies/server";
import { Groups } from "@/components/Groups";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className + " bg-background w-screen h-screen text-white"}>
				<CookiesProvider>
					<main className="flex w-full h-full flex-row">
						<Groups></Groups>
						<div className="w-full h-full bg-background flex ">{children}</div>
					</main>
				</CookiesProvider>
			</body>
		</html>
	);
}
