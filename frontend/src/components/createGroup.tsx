import { api } from "@/utils/api";
import { useState } from "react";

function CreateGroupButton() {
	const [groupName, setGroupName] = useState("");

	const handleSubmit = async () => {
		const response = await api.post("/group", {
			name: groupName,
		});

		// handle response
	};

	return <button onClick={handleSubmit}>Create New Group</button>;
}
