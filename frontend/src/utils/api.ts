import axios from "axios";
import { env } from "./env.config";

const BACKEND_URL = env.BACKEND_URL || "http://localhost:3001/api";

class Api {
	async get(url: string, query?: object, token?: string) {
		try {
			const res = await axios.get(BACKEND_URL + url, {
				params: query,
				headers: { Authorization: `Bearer ${token}` },
			});
			return res.data;
		} catch (error: any) {
			return error.response?.data || error;
		}
	}

	async post(url: string, data?: object, token?: string) {
		try {
			const res = await axios.post(BACKEND_URL + url, data, { headers: { Authorization: `Bearer ${token}` } });
			return res.data;
		} catch (error: any) {
			return error.response?.data || error;
		}
	}

	async patch(url: string, data?: object, token?: string) {
		try {
			const res = await axios.patch(BACKEND_URL + url, data, { headers: { Authorization: `Bearer ${token}` } });
			return res.data;
		} catch (error: any) {
			return error.response?.data || error;
		}
	}
}

export const api = new Api();
