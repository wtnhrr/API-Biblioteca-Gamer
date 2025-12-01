import UserRepository from '../repositories/user.repository.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

class AuthService {
    static async login(email, senha) {
        const user = await UserRepository.findByEmail(email);
        if (!user) {
            const error = new Error('Credenciais inválidas.');
            error.statusCode = 401;
            throw error;
        }

        const isPasswordValid = await bcrypt.compare(senha, user.senha);
        if (!isPasswordValid) {
            const error = new Error('Credenciais inválidas.');
            error.statusCode = 401;
            throw error;
        }

        const payload = {
            userId: user.id,
            email: user.email,
            role: user.role
        };

        const token = jwt.sign(payload, JWT_SECRET, {
            expiresIn: '1h'
        });

        return token;
    }
}

export default AuthService;