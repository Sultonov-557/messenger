const express = require("express");
const app = express();
const db = require("./db");
const jwt = require("jsonwebtoken");

async function start() {
	await db.start();
	app.listen(8080, () => {
		console.log("backend started");
	});

	app.get("/login", async (req, res) => {
		const { username, password } = req.query;
		const user = await db.query(`SELECT * FROM user WHERE username='${username}'`);
		if (!user || password != user.password) {
			res.redirect("http://localhost/login");
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
}

module.exports = { start };
