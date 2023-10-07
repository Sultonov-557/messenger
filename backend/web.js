const express = require("express"); //importing express package
const app = express(); //making application
const db = require("./db"); //importing database package
const jwt = require("jsonwebtoken"); //importing jsonWebToken package
const cors = require("cors"); //importing middleware for express

async function start() {
	await db.connect(); //connecting to database

	//listening backend server on port 8080
	app.listen(8080, () => {
		console.log("backend started");
	});
	//using express body parser
	app.use(express.json());

	//i have no idea what this does but it is working
	app.use(cors({ origin: "*", credentials: true }));

	//adding listener for /login endpoint
	app.get("/login", async (req, res) => {
		//getting username and password from query
		const { username, password } = req.query;

		//getting user from database
		const user = await db.query(`SELECT * FROM user WHERE username='${username}'`);

		//checking user or password is correct
		if (!user || password != user.password) {
			res.redirect("http://localhost/login"); //redirecting user to login page
			return; //stopping code
		}

		//signing new token for user
		const token = jwt.sign({ ID: user.ID }, "secret");

		//saving token to database
		await db.query(`UPDATE user SET ? WHERE ID='${user.ID}'`, { token });

		//saving token to browser
		res.cookie("token", token);

		//redirecting to home page
		res.redirect("http://localhost/");
	});

	//adding listener for /register endpoint to register users
	app.get("/register", async (req, res) => {
		//getting username and password from query
		const { username, password } = req.query;

		//getting user from database
		const user = await db.query(`SELECT * FROM user WHERE username='${username}'`);

		//checking username is available or not
		if (user) {
			res.redirect("http://localhost/register");
			return;
		}

		//inserting new user to database
		await db.query("INSERT INTO user (username, password) VALUES (?, ?)", [username, password]);

		//redirecting user to login page
		res.redirect("http://localhost/login");
	});

	//adding listener for /verify endpoint to verify token
	app.post("/verify", async (req, res) => {
		//getting token from body
		const token = req.body.token;

		//verifying token
		const { ID } = jwt.verify(token, "secret");

		//getting user from database
		const user = await db.query(`SELECT * FROM user WHERE ID='${ID}' AND token='${token}'`);

		//sending user information
		if (user) {
			res.send({ done: true, user });
		} else {
			res.send({ done: false });
		}
	});

	//TODO write documentation for log out
	app.post("/logout", async (req, res) => {
		const token = req.body.token;

		const { ID } = jwt.verify(token, "secret");

		const user = await db.query(`SELECT * FROM user WHERE ID='${ID}' AND token='${token}'`);
		if (user) {
			console.log(ID);
			await db.query(`UPDATE user SET ? WHERE ID='${ID}'`, { token: "" });
			res.send({ done: true });
		} else {
			res.send({ done: false });
		}
	});
}

module.exports = { start };
