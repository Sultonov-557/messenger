const mysql = require("mysql2/promise");

/**@type {mysql.Connection} */
let db;

async function start() {
	db = await mysql.createConnection({ host: "127.0.0.1", port: 3300, database: "messenger", password: "root", user: "root" });
	db.connect();
}

async function query(queryString, options) {
	let res;
	if (options) {
		res = await db.query(queryString, options);
	} else {
		res = await db.query(queryString);
	}
	return res[0][0];
}

async function queryAll(queryString, options) {
	let res;
	if (options) {
		res = await db.query(queryString, options);
	} else {
		res = await db.query(queryString);
	}
	return res[0];
}

module.exports = { start, query, queryAll };
