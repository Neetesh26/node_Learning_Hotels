const express = require("express");
const router = express.Router()


//model =--> table
const person = require("../models/persons");


router.post("/", async function (req, res) {
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
  router.get('/' ,async (req ,res)=>{
      try {
          const data = await person.find()
          console.log("data fetched");
      res.status(200).json(data);
      } catch (error) {
          console.log(error)
          res.status(500).json({error: "internal server error"})
      }
  })
  
  router.get('/:worktype', async (req ,res)=>{
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

  module.exports = router