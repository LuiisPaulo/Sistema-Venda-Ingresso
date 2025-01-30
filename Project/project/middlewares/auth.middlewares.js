const jwt = require("jsonwebtoken");
const userModel = require("../models/user.models");

const validation = (req, res, next) => {
    const token = req.headers("Autorizado").replace("Bearer ", "");
    if (!token){
        return res.status(401).json({ message: "Token não encontrado" });
    }

    try {
        const decode = jwt.verify(token, "secret");
        req.user = decode; 
        next();
    } catch (err) {
        return res.status(401).json({ message: "Erro ao validar o token" });
    }
};

exports.isAdmin = async (req, res, next) => {
    const user = await userModel.findById(req.user.userId);
    if (user.role !== "admin") {
        return res.status(401).json({ message: "Usuário não autorizado" });
    }
    next();
};
