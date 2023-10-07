const express = require("express"); //importing express
const app = express(); //making application
app.listen(80); //listening application on port 80

app.use(express.static(__dirname + "/frontend", { extensions: ["html"] })); //making frontend directory public on port 80
require("./backend").start(); //starting backend
