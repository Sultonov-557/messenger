import Link from "next/link";

export default async function Auth() {
	return (
		<div>
			<div>
				<h1>Welcome to My Chat App</h1>
				<nav>
					<ul>
						<li>
							<a href="./login">Login</a>
						</li>
						<li>
							<a href="./register">Register</a>
						</li>
					</ul>
				</nav>
			</div>
			{/* ... rest of your code ... */}
		</div>
	);
}
