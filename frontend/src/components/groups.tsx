"use client";
import { api } from "@/utils/api";
import { useState } from "react";

export async function Groups() {
	const [groups, setGroups] = useState([]);

	const res = await api.get("/group", {});

	setGroups(res.data.data.map((v: any) => v.name));

	return <div className="w-96 h-full bg-foreground">{groups}</div>;
}
