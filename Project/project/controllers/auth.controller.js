const userModel = require('../models/user.models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    const user = new UserActivation({ name, email, password });;
    user.save();
    try{
        res.status(201).json({ message: 'Usuario cadastrado com sucesso'});
    }catch(err){
        res.status(500).json({ message: 'Erro ao cadastrar o usuario' });;
    }
}

exports.login = async (req, res) => {
    const { name, email, password } = req.body;
    try{
        const user = User.findOne({ name, email });
        if(!user){
            throw new Error('Usuário não encontrado');
        }
        if(!(await bcrypt.compare(password, user.password))){
        throw new Error('Senha incorreta');;
        }
        const token = jwt.sign({ id: user_id, name: user.name, email: user.email, role: user.role}, 'secret key', { expiresIn: '1h' });
        res.json({ token });
    }catch(err){
        res.status(400).json({ message: err.message });
    }
}
