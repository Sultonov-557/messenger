import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { api } from "./utils/api";

export async function middleware(request: NextRequest) {
	if (request.nextUrl.pathname.startsWith("/_next")) return;

	if (!request.nextUrl.pathname.startsWith("/auth")) {
		const authHeader = request.cookies.get("accessToken")?.value;
		console.log(request.cookies);

		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			let url = request.nextUrl.clone();
			url.pathname = "/auth";
			return NextResponse.redirect(url);
		}

		const token = authHeader.split(" ")[1];

		let res = await api.get("/user/me", {}, token);
		if (!res.success) {
			let url = request.nextUrl.clone();
			url.pathname = "/auth";
			return NextResponse.redirect(url);
		}
	}
}
