"use client";
import { api } from "@/utils/api";
import { useEffect, useState } from "react";

export function Groups() {
	const [groups, setGroups] = useState([]);

	useEffect(() => {
		(async () => {
			const res = await api.get("/group", {});

			setGroups(res.data.data.map((v: any) => v.name));
		})();
	}, []);

	return <div className="w-96 h-full bg-foreground">{groups}</div>;
}
