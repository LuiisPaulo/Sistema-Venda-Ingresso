const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
    unique: true,
    minlegnth: 3,
    maxlength: 30
  },
  email:{
    type: String,
    required: true,
    unique: true,
    minlegnth: 3,
    maxlength: 30
  },
  password: {
    type: String,
    required: true,
    minlegnth: 8,
    maxlength: 10
  },
  admin:{
    type: Boolean,
    default: false
  },
  timestamps: true 
});

userSchema.pre('save', async function(next){
  if(this.isModified('password')){
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model('User', userSchema );

