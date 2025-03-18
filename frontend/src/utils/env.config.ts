interface Env {
	BACKEND_URL: string;
}

export const env: Env = {
	BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001/api",
};
