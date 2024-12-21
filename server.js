const express = require("express");
const app = express();
const db = require("./db");

// data receive any form req.body
const bodyParser = require('body-parser')
app.use(bodyParser.json())  // req.body



//model =--> table

const MenuItem = require("./models/MenuItems")


app.get("/", function (req, res) {
  res.send("Hello World");
  console.log("server start :");
});




//MenuItems-->
app.post('/MenuItems' ,async function (req, res){
    try {
        const MenuData = req.body
        const newitems = new MenuItem(MenuData)


        const MenuDataSaved = await newitems.save()
        console.log("MenuData Saved");
        res.status(200).json(MenuDataSaved)  // what data receive in  postman 
        
    } catch (error) {
        console.log("Internal error");
        res.status(500).json({error:" internal server error"})
    }
})

//require page person route
const personroutes = require('./routes/personsroutes') 

// middleware use person route
app.use('/person',personroutes)

app.listen(3000);
