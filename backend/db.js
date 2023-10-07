const mysql = require("mysql2/promise"); //importing mysql package that works with promise

/**@type {mysql.Connection} */
let db; //setting global variable to store database connection

async function connect() {
	//creating connection
	db = await mysql.createConnection({ host: "127.0.0.1", port: 3300, database: "messenger", password: "root", user: "root" });
	//connecting
	db.connect();
}

//this function gets response from database and destruct object from array
async function query(queryString, queryOptions) {
	const response = await db.query(queryString, queryOptions); //getting data from database

	return response[0][0]; //destructing and returning it
}

//this function gets response from database and destruct objects from array
async function queryAll(queryString, queryOptions) {
	const response = await db.query(queryString, queryOptions);

	return response[0];
}

//exporting functions
module.exports = { connect, query, queryAll };
