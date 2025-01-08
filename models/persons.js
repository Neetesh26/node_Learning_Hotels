const mongoose = require("mongoose");

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

// create person model --- >table

const person = mongoose.model("person", personSchema);
module.exports = person;
