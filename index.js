const express = require("express");
const app = express();
app.listen(80);

app.use(express.static(__dirname + "/frontend", { extensions: ["html"] }));
require("./backend").start();
