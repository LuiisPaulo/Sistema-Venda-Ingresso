import jwt from 'jsonwebtoken';

const validation = (req, res, next) => {
    const token = req.cookies.token;
    
    if (!token) {
        return res.status(401).redirect('/login');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).redirect('/login');
    }
};

export default validation;