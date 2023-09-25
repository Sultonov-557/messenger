const fs = require("fs");
let db = {};

read();
setInterval(write, 30000);

function get(key, name) {
	return db[key][name];
}

function set(key, name, value) {
	if (!db[key]) {
		console.log("init");
		db[key] = {};
	}
	db[key][name] = value;
}

function getAll(key) {
	return db[key];
}

function setAll(key, value) {
	db[key] = value;
}

function read() {
	db = JSON.parse(fs.readFileSync(__dirname + "/db.json"));
}

function write() {
	fs.writeFileSync(__dirname + "/db.json", JSON.stringify(db, null, 4));
}

module.exports = { get, set, getAll, setAll };
