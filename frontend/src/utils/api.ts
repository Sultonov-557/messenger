import axios from "axios";

const BACKEND_URL = "http://localhost:3001/api";

class Api {
	async get(url: string, query?: object, token?: string) {
		try {
			const res = await axios.get(BACKEND_URL + url, { params: query, headers: { Authorization: `bearer ${token}` } });
			return res.data;
		} catch (error: any) {
			return error.response?.data || { success: false, error: "UNKNOWN" };
		}
	}
}

export const api = new Api();
