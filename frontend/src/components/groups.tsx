import { api } from "@/utils/api";
import { cookies } from "next/headers";
import Group from "./group";

export async function Groups() {
	const cookieStore = cookies();
	let groups: any = [];

	try {
		const res = await api.get("/group", {}, cookieStore.get("access_token")?.value);

		groups = res.data.data.map((v: any) => <Group id={v.id} name={v.name} key={v.id} />);

		return <div className="w-96 h-full bg-foreground   max-sm:hidden">{groups}</div>;
	} catch {
		return <div></div>;
	}
}
