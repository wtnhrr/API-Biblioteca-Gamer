import Game from '../models/game.model.js';

class GameRepository {
  
  static async findAll() {
    return await Game.find();
  }

  static async findById(id) {
    return await Game.findById(id);
  }

  static async create(gameData) {
    const novoGame = new Game(gameData);
    return await novoGame.save();
  }

  static async update(id, gameData) {
    return await Game.findByIdAndUpdate(id, gameData, { new: true });
  }

  static async delete(id) {
    return await Game.findByIdAndDelete(id);
  }
}

export default GameRepository;