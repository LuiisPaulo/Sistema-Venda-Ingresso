import userModel from '../models/user.models.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export async function register(req, res) {
    const { name, email, password } = req.body;
    let user = new User({ name, email, password });
    user.save();
    res.status(201).send('Usuario registrado com sucesso ');
    user.redirect('/login');
};

export async function login(req, res) { 
    const { email, password } = req.body;
    let user = await userModel.find({ email });
    if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(400).send(' Credenciais incorretas ');
    }
    const token = jwt.sign({ id: user._id, role: user.role}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
    res.cookie('token', token).redirect();

};

const authController = {
    register,
    login,
};

export default authController;
