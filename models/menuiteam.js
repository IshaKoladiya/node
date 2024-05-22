
const mongoose = require('mongoose');

const menuiteam = new mongoose.Schema({
name:{
  type: String,
  required: true,
},
price:{
  type: Number,
  required: true,
},
tasts:{
  type: String,
  enum:["sweet","spicy","sour"],
  required: true,
},
is_drink:{
  type:Boolean,
  default:false,
},
ingrindiants:{
  type:[String],
  default:[],
},
num_sales:{
  type:String,
}
})

// create menu model

const menu = mongoose.model('menuiteams',menuiteam);
module.exports = menu;