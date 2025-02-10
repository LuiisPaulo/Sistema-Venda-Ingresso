import userModel from '../models/user.models';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

exports.register = async function (req, res) {
    const { name, email, password } = req.body;
    let user = new User({ name, email, password });
    user.save();
    res.status(201).send('Usuario registrado com sucesso ');
    user.redirect('/login');
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    let user = await userModel.find({ email });
    if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(400).send(' Credenciais incorretas ');
    }
    const token = jwt.sign({ id: user._id, role: user.role}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
    res.cookie('token', token).redirect();

};


