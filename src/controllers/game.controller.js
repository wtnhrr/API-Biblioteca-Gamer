import GameService from '../services/game.service.js';
import GameDTO from '../dtos/game.dto.js';

class GameController {

  static async getAll(req, res, next) {
    try {
      const games = await GameService.getAll();

      const gamesDTO = games.map(game => new GameDTO(game));

      res.status(200).json(gamesDTO);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const id = req.params.id;
      const game = await GameService.getById(id);

      res.status(200).json(new GameDTO(game));
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const gameData = req.body;
      const novoGame = await GameService.create(gameData);

      res.status(201).json(new GameDTO(novoGame));
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const id = req.params.id;
      const gameData = req.body;
      const updatedGame = await GameService.update(id, gameData);

      res.status(200).json(new GameDTO(updatedGame));
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const id = req.params.id;
      await GameService.delete(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default GameController;