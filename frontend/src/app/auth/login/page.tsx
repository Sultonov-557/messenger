import { Button, TextField } from "@mui/material";

export default function LoginPage() {
  return (
    <div className="flex w-screen h-screen justify-center items-center text-center">
      <div className=" h-80 w-96 bg-foreground flex flex-col justify-center items-center col-span-2">
        <TextField variant="filled" className="w-80">
          Username
        </TextField>
        <TextField variant="filled" className="w-80">
          Password
        </TextField>
        <Button variant="contained" className="bg-blue-400 hover:bg-green-400">
          Login
        </Button>
      </div>
    </div>
  );
}
