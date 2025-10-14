import db from '../database/db.js';
import { v4 as uuidv4 } from 'uuid';

class GameRepository {
    static findAll() {
        return db.data.games;
    }

    static findById(id) {
        return db.data.games.find(g => g.id === id);
    }

    static async create(gameData) {
        const novoGame = {
            id: uuidv4(),
            ...gameData
        };
        db.data.games.push(novoGame);
        await db.write();
        return novoGame;
    }

    static async update(id, gameData) {
        const index = db.data.games.findIndex(g => g.id === id);
        if (index === -1) return null;

        db.data.games[index] = { id, ...gameData };
        await db.write();
        return db.data.games[index];
    }

    static async delete(id) {
        db.data.games = db.data.games.filter(g => g.id !== id);
        await db.write();
    }
}

export default GameRepository;