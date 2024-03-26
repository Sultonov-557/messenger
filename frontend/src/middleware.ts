import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
const BACKEND_URL = "http://localhost:3001/api";

export async function middleware(request: NextRequest) {
	if (request.nextUrl.pathname.startsWith("/_next")) return;

	if (!request.nextUrl.pathname.startsWith("/auth")) {
		const authHeader = request.cookies.get("access_token")?.value;

		if (!authHeader) {
			let url = request.nextUrl.clone();
			url.pathname = "/auth";
			return NextResponse.redirect(url);
		}

		const token = authHeader;

		let res = await (await fetch(BACKEND_URL + "/user/me", { headers: { authorization: `Bearer ${token}` } })).json();
		if (!res.success) {
			let url = request.nextUrl.clone();
			url.pathname = "/auth";
			return NextResponse.redirect(url);
		}
	}
}
