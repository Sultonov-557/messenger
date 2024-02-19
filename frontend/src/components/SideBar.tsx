import Button from "./Button";

export default function SideBar() {
  return (
    <div className="h-screen bg-foreground">
      <Button>Profile</Button>
      <Button>Chats</Button>
      <Button>Settings</Button>
    </div>
  );
}
