import jwt from 'jsonwebtoken';
import 'dotenv/config';

const JWT_SECRET = process.env.JWT_SECRET;

function authMiddleware(req, res, next) {
    let token = null;

    const authHeader = req.headers.authorization;
    
    if (authHeader) {
        const parts = authHeader.split(' ');
        if (parts.length === 2 && /^Bearer$/i.test(parts[0])) {
            token = parts[1];
        }
    }

    if (!token && req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }

    if (!token) {
        if (req.accepts('html')) {
             return res.redirect('/login');
        }
        return res.status(401).json({ mensagem: "Token não fornecido." });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            if (req.accepts('html')) {
                 return res.redirect('/login');
            }
            return res.status(401).json({ mensagem: "Token inválido ou expirado." });
        }

        req.user = {
            id: decoded.userId,
            email: decoded.email,
            role: decoded.role
        };

        return next();
    });
}

export default authMiddleware;