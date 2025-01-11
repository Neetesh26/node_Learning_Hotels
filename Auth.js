const passport =require('passport')
const localStrategy = require('passport-local').Strategy
const person =require('./models/persons')

passport.use(new localStrategy (async(username , password , done)=>{
    try {
      const user = await person.findOne({username:username})
      if(!user)
        return done(null, false, {message:"incorrect username"})
      
      // const isPasswordMatch =user.password == password ? true : false
      const isPasswordMatch = await user.comparePassword(password)
      if(isPasswordMatch){
        return done(null , user )
      }else{
        return done(null , false , {message : "password incorrect "})
      }
    } catch (error) {
      return done(error)
    }
  }))

  module.exports =passport //export configured 