import jwt from 'jsonwebtoken';
import UserService from '../services/user.service.js';
import 'dotenv/config';

const JWT_SECRET = process.env.JWT_SECRET;

async function injectUser(req, res, next) {
    res.locals.user = null;

    const token = req.cookies.token;

    if (!token) {
        return next();
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await UserService.getById(decoded.userId);
        
        if (user) {
            res.locals.user = user;
        }
        next();
    } catch (error) {
        res.clearCookie('token');
        next();
    }
}

export default injectUser;