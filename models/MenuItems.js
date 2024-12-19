const mongoose = require("mongoose");

const Menucard = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  taste: {
    type: String,
    enum: ["sweet", "spicy", "sour"],
    required: true
  },
  is_drink: {
    type: Boolean,
    default: false
  },
  ingridient: {
    type: String,
    required:true
  },
  num_sales: {
    type: Number,
    default: 0
  },
});
const MenuItems = mongoose.model("MenuItems", Menucard);

module.exports = MenuItems;
