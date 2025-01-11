const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
  },
  Work: {
    type: String,
    enum: ["chef", "waiter"],
    require: true,
  },
  mobile: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  address: {
    type: String,
  },
  salary: {
    require: true,
    type: Number,
  },
  username: {
    require: true,
    type: String,
  },
  password: {
    require: true,
    type: String,
  },
});

//bcrypt password-
personSchema.pre('save', async function(next) {
  const person = this;

  
  if(!person.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(person.password, salt);
    person.password = hashpassword;

    next();
  } catch (error) {
    return next(error);
  }
});

//function comparePassword
personSchema.methods.comparePassword = async function(candidatePassword){
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
  } catch (error) {
    throw error
  }
}

// create person model --- >table

const person = mongoose.model("person", personSchema);
module.exports = person;
