const express = require("express");
const app = express();
const db = require("./db");

// data receive any form req.body
const bodyParser = require('body-parser')
app.use(bodyParser.json())  // req.body


//model =--> table
const person = require("./models/persons");

const MenuItem = require("./models/MenuItems")


app.get("/", function (req, res) {
  res.send("Hello World");
  console.log("server start :");
});


app.post("/person", async function (req, res) {
  try {
    // res.send("data is saved");
    const data = req.body;

    const newPerson = new person(data);
    // newPerson.name = data.name
    // newPerson.age = data.age
    // newPerson.work = data.work
    // newPerson.mobile = data.mobile
    // newPerson.email = data.email
    // newPerson.address = data.address
    // newPerson.salary = data.salary

    const datasaved = await newPerson.save();
    console.log("data saved");
    res.status(200).json(datasaved);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});


//data find all user--->
app.get('/person' ,async (req ,res)=>{
    try {
        const data = await person.find()
        console.log("data fetched");
    res.status(200).json(data);
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "internal server error"})
    }
})

app.get('/person/:worktype', async (req ,res)=>{
  try {
    const worktype = req.params.worktype;
    if(worktype =='chef' , worktype == 'waiter'){

      const response =await person.find({work:worktype})
      console.log('response fetched');
      res.status(200).json(response)
      
    }
    else{
      res.status(404).json({error: "invalid page"})

    }
  } catch (error) {
    console.log(error)
    res.status(500).json({error: "internal server error"})
  }
})

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

app.listen(3000);
