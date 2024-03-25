import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { api } from "./utils/api";

export async function middleware(request: NextRequest) {
	if (request.nextUrl.pathname.startsWith("/_next")) return;

	if (!request.nextUrl.pathname.startsWith("/auth")) {
		const token = request.cookies.get("token");

		let res = await api.get("/user/me", {}, `bearer ${token}`);
		if (!res.success) {
			let url = request.nextUrl.clone();
			url.pathname = "/auth";
			return NextResponse.redirect(url);
		}
	}
}
