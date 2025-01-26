const userModel = require("../models/user.models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, admin } = req.body;
    const user = new userModel({ name, email, password, admin });
    await user.save();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.loginUser = async(req, res) => {
  try{
    const {email, password} = req.body;
    const user = await userModel.findOne({email});
    if(!user || !(await bcrypt.compare(password, user.password))){
      res.status(401).json({message: "Email ou senha inválida"});
    }

  }catch(error){
    res.status(500).json({message: error.message});
  }
};

// TODO - Verificar
