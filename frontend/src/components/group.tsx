"use client";
interface Props {
	name: string;
	id: string;
}

const Group = ({ name, id }: Props) => {
	const handleClick = () => {
		window.location.href = `/group/${id}`;
	};

	return (
		<div className="chat-list-item bg-button text-white p-3 m-2 rounded-lg cursor-pointer" onClick={handleClick}>
			<h3 className="text-lg font-medium">{name}</h3>
		</div>
	);
};

export default Group;
