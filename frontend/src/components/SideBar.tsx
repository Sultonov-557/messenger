import SideBarButton from "./SideBarButton";

export default function SideBar() {
	return (
		<div className="fixed bg-indigo-700 text-white top-0 left-0 h-screen w-17 flex flex-col shadow-lg">
			<SideBarButton>hello</SideBarButton>
		</div>
	);
}
