const express = require("express");
const app = express();
const db = require("./db");

// data receive any form req.body
const bodyParser = require('body-parser')
app.use(bodyParser.json())  // req.body






app.get("/", function (req, res) {
  res.send("Hello World");
  console.log("server start :");
});





//require page person route
const personroutes = require('./routes/personsroutes') 
const MenuItems = require('./routes/menuitemsroute')

// middleware use person route
app.use('/person',personroutes)
app.use('/MenuItems',MenuItems)

app.listen(3000);
