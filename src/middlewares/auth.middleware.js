import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ mensagem: "Token não fornecido." });
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2) {
        return res.status(401).json({ mensagem: "Erro no formato do token." });
    }

    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).json({ mensagem: "Token mal formatado." });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
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