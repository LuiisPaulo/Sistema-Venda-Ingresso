import userModel from '../models/user.models.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export async function register(req, res) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).send('Todos os campos são obrigatórios');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        let user = new userModel({ name, email, password: hashedPassword });

        await user.save();

        // Responder com sucesso
        res.status(201).send('Usuário registrado com sucesso');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao registrar o usuário');
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;

        let user = await userModel.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).send('Credenciais incorretas');
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE }
        );

        res.cookie('token', token).redirect('/dashboard');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao fazer login');
    }
}

const authController = {
    register,
    login,
};

export default authController;