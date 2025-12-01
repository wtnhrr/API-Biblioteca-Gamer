import ReviewRepository from '../repositories/review.repository.js';
import GameRepository from '../repositories/game.repository.js';

class ReviewService {
  
  static async create(usuarioId, reviewData) {
    // valida se o jogo existe
    const game = await GameRepository.findById(reviewData.gameId);
    if (!game) {
      const error = new Error('Jogo não encontrado.');
      error.statusCode = 404;
      throw error;
    }

    // objeto para salvar
    const novaReview = {
      usuario: usuarioId,
      game: reviewData.gameId,
      nota: reviewData.nota,
      comentario: reviewData.comentario
    };

    try {
      return await ReviewRepository.create(novaReview);
    } catch (error) {
      if (error.code === 11000) {
        const err = new Error('Você já avaliou este jogo.');
        err.statusCode = 409;
        throw err;
      }
      throw error;
    }
  }

  static async findAll() {
    return await ReviewRepository.findAll();
  }

  static async getByGameId(gameId) {
    return await ReviewRepository.findByGameId(gameId);
  }

  static async delete(reviewId, userId, userRole) {
    const review = await ReviewRepository.findById(reviewId);
    
    if (!review) {
      throw { statusCode: 404, message: 'Review não encontrada.' };
    }

    const isOwner = review.usuario.toString() === userId;
    const isAdmin = userRole === 'admin';

    if (!isOwner && !isAdmin) {
      throw { statusCode: 403, message: 'Você não tem permissão para deletar esta review.' };
    }

    return await ReviewRepository.delete(reviewId);
  }
}

export default ReviewService;