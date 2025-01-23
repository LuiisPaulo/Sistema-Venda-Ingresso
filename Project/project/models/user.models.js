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
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  timestamps: true 
});

module.exports = mongoose.model('User', userSchema );