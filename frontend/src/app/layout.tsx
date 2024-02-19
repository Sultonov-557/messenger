import type { Metadata } from "next";
import "./globals.css";
import { CssBaseline } from "@mui/material";

export const metadata: Metadata = {
  title: "Chat APP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="flex bg-background h-screen w-screen">{children}</main>
      </body>
    </html>
  );
}
