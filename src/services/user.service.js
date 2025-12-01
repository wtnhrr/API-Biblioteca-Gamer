import UserRepository from '../repositories/user.repository.js';
import GameRepository from '../repositories/game.repository.js';
import bcrypt from 'bcrypt';

class UserService {
    static async getAll() {
        return await UserRepository.findAll();
    }

    static async getById(id) {
        const user = await UserRepository.findById(id);
        if (!user) {
            const error = new Error('Usuário não encontrado.');
            error.statusCode = 404;
            throw error;
        }
        return user;
    }

    static async create(userData) {
        const existingUser = await UserRepository.findByEmail(userData.email);
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
        const existingUser = await UserRepository.findById(id);
        if (!existingUser) {
            const error = new Error('Usuário não encontrado para atualização.');
            error.statusCode = 404;
            throw error;
        }
        return await UserRepository.update(id, userData);
    }

    static async delete(id) {
        const existingUser = await UserRepository.findById(id);
        if (!existingUser) {
            const error = new Error('Usuário não encontrado para exclusão.');
            error.statusCode = 404;
            throw error;
        }
        await UserRepository.delete(id);
    }

    static async comprarJogo(userId, gameId) {
    const user = await UserRepository.findById(userId);
    if (!user) throw { statusCode: 404, message: 'Usuário não encontrado.' };

    const game = await GameRepository.findById(gameId);
    if (!game) throw { statusCode: 404, message: 'Jogo não encontrado.' };

    const jaPossui = user.biblioteca.some(g => g._id.toString() === gameId);
    if (jaPossui) {
      throw { statusCode: 409, message: 'Você já possui este jogo na biblioteca.' };
    }

    if (user.saldo < game.preco) {
      throw { statusCode: 400, message: `Saldo insuficiente. O jogo custa ${game.preco}, você tem ${user.saldo}.` };
    }
    
    const novosDados = {
      saldo: user.saldo - game.preco,
      biblioteca: [...user.biblioteca.map(g => g._id), game._id] 
    };

    return await UserRepository.update(userId, novosDados);
  }
}

export default UserService;