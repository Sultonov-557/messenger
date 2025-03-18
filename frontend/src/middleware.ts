import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { env } from "./utils/env.config";

const BACKEND_URL = env.BACKEND_URL;

export async function middleware(request: NextRequest) {
	// For protected routes (main routes), verify auth token
	const authHeader = request.cookies.get("access_token")?.value;

	// If no auth token, redirect to auth
	if (!authHeader) {
		const url = request.nextUrl.clone();
		url.pathname = "/auth";
		return NextResponse.redirect(url);
	}

	// Verify token with backend
	try {
		const response = await fetch(`${BACKEND_URL}/user/me`, {
			headers: { authorization: `Bearer ${authHeader}` },
		});

		if (!response.ok) {
			const url = request.nextUrl.clone();
			url.pathname = "/auth";
			return NextResponse.redirect(url);
		}

		const res = await response.json();
		if (!res.success) {
			const url = request.nextUrl.clone();
			url.pathname = "/auth";
			return NextResponse.redirect(url);
		}
	} catch (error) {
		console.error("Authentication error:", error);
		const url = request.nextUrl.clone();
		url.pathname = "/auth";
		return NextResponse.redirect(url);
	}
}

// Define which paths should be processed by this middleware
export const config = {
	// Only run on specific paths, excluding Next.js internals, static files, and auth routes
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * - auth/ (auth routes)
		 */
		"/((?!_next/static|_next/image|favicon.ico|auth).*)",
	],
};
