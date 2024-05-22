
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const personSchema = new mongoose.Schema({
name:{
  type: String,
  required: true,
},
age:{
  type: Number,
},
work:{
  type: String,
  enum: ["chef" , "waiter","manager"],
  required: true,
},
mobile:{
  type:Number,
  required: true,
},
email:{
  type:String,
  required:true,
  unique:true,
},
address:{
  type:String,
},
selary:{
type:String,
require:true,
},
username:{
  type:String,
  require:true,
},
password:{
  type:String,
  require:true,
}
})

personSchema.pre('save',async function(next){
const person = this;
if (!person.isModified('password')) return next();
 
  try {
// genSalt password generation
    const salt = await bcrypt.genSalt(10);

    // hashed password
    const hashPassword = await bcrypt.hash(person.password,salt)

    person.password = hashPassword;
    next()
  } catch (error) {
    return next(error);
  }
});

personSchema.methods.comparePassword = async function(candidatepassword){
  try {
    const isMatch = await bcrypt.compare(candidatepassword,this.password)
    return isMatch
    
  } catch (error) {
    throw error
  }
}

// create person model
const person = mongoose.model('peoples',personSchema);
module.exports = person;