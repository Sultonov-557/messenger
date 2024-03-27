export default function AuthPage() {
	return (
		<div className="h-screen w-screen flex items-center">
			<div className="max-w-md mx-auto p-5 rounded-md shadow-md">
				<h1 className="text-2xl font-medium text-white">
					<a href="./auth/login" className="text-link underline">
						login
					</a>{" "}
					or{" "}
					<a href="./auth/register" className="text-link underline">
						create new account
					</a>
				</h1>
			</div>
		</div>
	);
}
