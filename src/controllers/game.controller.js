import GameService from '../services/game.service.js';

class GameController {

    static async getAll(req, res) {
        try {
            const allGames = await GameService.getAll();
            res.status(200).json(allGames);
        } catch (error) {
            res.status(500).json({ mensagem: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const id = req.params.id;
            const game = await GameService.getById(id);

            res.status(200).json(game);
        } catch (error) {
            res.status(error.statusCode || 500).json({ mensagem: error.message });
        }
    }

    static async create(req, res) {
        try {
            const gameData = req.body;
            const novoGame = await GameService.create(gameData);

            res.status(201).json(novoGame);

        } catch (error) {
            res.status(error.statusCode || 500).json({ mensagem: error.message });
        }
    }

    static async update(req, res) {
        try {
            const id = req.params.id;
            const gameData = req.body;
            const updatedGame = await GameService.update(id, gameData);

            res.status(200).json(updatedGame);
        } catch (error) {
            res.status(error.statusCode || 500).json({ mensagem: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const id = req.params.id;
            await GameService.delete(id);
            
            res.status(204).send();
        } catch (error) {
            res.status(error.statusCode || 500).json({ mensagem: error.message });
        }
    }
}

export default GameController;