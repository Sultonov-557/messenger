const express = require("express");
const app = express();
app.listen(80);

app.get("/", (req, res) => {
	res.send("helo");
});
