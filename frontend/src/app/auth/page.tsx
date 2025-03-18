export default function AuthPage() {
	return (
		<div className="min-h-screen w-full flex flex-col items-center justify-center bg-background px-4 py-12">
			<div className="w-full max-w-md mx-auto">
				<div className="text-center mb-8">
					<h1 className="text-4xl font-bold text-white mb-2">Messenger</h1>
				</div>

				<div className="bg-foreground p-8 rounded-xl shadow-lg border border-gray-700">
					<div className="space-y-6">
						<a
							href="./auth/login"
							className="flex items-center justify-center w-full py-3 px-4 bg-button hover:bg-opacity-90 transition-all duration-200 text-white font-medium rounded-lg"
						>
							Sign In
						</a>
						<a
							href="./auth/register"
							className="flex items-center justify-center w-full py-3 px-4 bg-transparent border border-gray-600 hover:border-gray-500 text-white font-medium rounded-lg transition-all duration-200"
						>
							Create New Account
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
