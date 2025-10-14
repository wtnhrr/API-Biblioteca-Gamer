import UserRepository from '../repositories/user.repository.js';
import bcrypt from 'bcrypt';

class UserService {

    static getAll() {
        return UserRepository.findAll();
    }

    static getById(id) {
        const user = UserRepository.findById(id);
        if (!user) {
            const error = new Error('Usuário não encontrado.');
            error.statusCode = 404;
            throw error;
        }
        return user;
    }

    static async create(userData) {
        const existingUser = UserRepository.findByEmail(userData.email);
        if (existingUser) {
            const error = new Error('Já existe um usuário com este e-mail.');
            error.statusCode = 409;
            throw error;
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(userData.senha, salt);

        const userToCreate = {
            nome: userData.nome,
            email: userData.email,
            senha: hashedPassword,
            role: userData.role
        };

        return await UserRepository.create(userToCreate);
    }

    static async update(id, userData) {
        const existingUser = UserRepository.findById(id);
        if (!existingUser) {
            const error = new Error('Usuário não encontrado para atualização.');
            error.statusCode = 404;
            throw error;
        }
        return await UserRepository.update(id, userData);
    }

    static async delete(id) {
        const existingUser = UserRepository.findById(id);
        if (!existingUser) {
            const error = new Error('Usuário não encontrado para exclusão.');
            error.statusCode = 404;
            throw error;
        }
        await UserRepository.delete(id);
    }
}

export default UserService;