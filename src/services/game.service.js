import GameRepository from '../repositories/game.repository.js';

class GameService {
    static getAll() {
        return GameRepository.findAll();
    }

    static getById(id) {
        const game = GameRepository.findById(id);
        if (!game) {
            const error = new Error('Game não encontrado.');
            error.statusCode = 404;
            throw error;
        }
        return game;
    }

    static async create(gameData) {
        return await GameRepository.create(gameData);
    }

    static async update(id, gameData) {
        const existingGame = GameRepository.findById(id);
        if (!existingGame) {
            const error = new Error('Game não encontrado para atualização.');
            error.statusCode = 404;
            throw error;
        }
        return await GameRepository.update(id, gameData);
    }

    static async delete(id) {
        const existingGame = GameRepository.findById(id);
        if (!existingGame) {
            const error = new Error('Game não encontrado para exclusão.');
            error.statusCode = 404;
            throw error;
        }
        await GameRepository.delete(id);
    }
}

export default GameService;