const express = require("express");
const app = express();
const db = require("./db");
const jwt = require("jsonwebtoken");
const cors = require("cors");

async function start() {
	await db.start();
	app.listen(8080, () => {
		console.log("backend started");
	});
	app.use(express.json());
	app.use(cors({ origin: "*", credentials: true }));

	app.get("/login", async (req, res) => {
		const { username, password } = req.query;
		const user = await db.query(`SELECT * FROM user WHERE username='${username}'`);
		if (!user || password != user.password) {
			res.redirect("http://localhost/login");
			return;
		}
		const token = jwt.sign({ ID: user.ID }, "secret");
		await db.query(`UPDATE user SET ? WHERE ID='${user.ID}'`, { token });
		res.cookie("token", token);
		res.redirect("http://localhost/");
	});

	app.get("/register", async (req, res) => {
		const { username, password } = req.query;
		const user = await db.query(`SELECT * FROM user WHERE username='${username}'`);
		if (user) {
			res.redirect("http://localhost/register");
		}
		await db.query("INSERT INTO user (username, password) VALUES (?, ?)", [username, password]);
		res.redirect("http://localhost/login");
	});

	app.post("/verify", async (req, res) => {
		const token = req.body.token;
		const { ID } = jwt.verify(token, "secret");

		const user = await db.query(`SELECT * FROM user WHERE ID='${ID}' AND token='${token}'`);
		if (user) {
			res.send({ done: true, user });
		} else {
			res.send({ done: false });
		}
	});

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
