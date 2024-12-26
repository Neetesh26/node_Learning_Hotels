const express = require("express");
const router = express.Router()

//model =--> table

const MenuItem = require("../models/MenuItems");




//MenuItems-->
router.post('/MenuItems' ,async function (req, res){
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


module.exports = router