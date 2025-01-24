const express = require("express");
const router = express.Router();
const { jwtMiddleware, generatetoken } = require('../jwt');

//model =--> table
const person = require("../models/persons");

router.post("/signup", async function (req, res) {
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

    //send data in payload to generate token
    const payload={
      id :datasaved.id,
      username:datasaved.username
    }
    console.log(JSON.stringify(payload));
    
    const token = generatetoken(datasaved.username)
    console.log("token is : ", token);

    res.status(200).json({ datasaved: datasaved , token: token});

    // res.status(200).json({ datasaved});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});

router.post("/login", async function(req,res){
  try {
      const {username,password} = req.body
      // console.log("username : ", username);
      // console.log("password : ", password);

      const user =await person.findOne({username:username})

      if(!user || !(await user.comparePassword(password))){
        return res.status(401).json({error:"invalid username or password"})
      }

      const payload ={
        id:user.id,
        username:user.username
      }
      const token = generatetoken(payload)
      res.status(200).json({token:token})

  } catch (error) {
    console.log(error);
    res.status(500).json({error:"internal server error"})
  }
 
})

router.get('/profile',jwtMiddleware , async (req,res)=>{
   try {
    const userdata = req.user
   console.log('userdata' , userdata);

   const userId = userdata.id
   const user = await person.findById(userId)
   res.status(200).json(user);

   } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
   }
})


//data find all user--->
router.get("/",jwtMiddleware, async (req, res) => { // jwtmiddleware autentication
  try {
    const data = await person.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});

router.get("/:worktype", async (req, res) => {
  try {
    const worktype = req.params.worktype;
    if ((worktype == "chef", worktype == "waiter")) {
      const response = await person.find({ work: worktype });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "invalid page" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});

module.exports = router;
