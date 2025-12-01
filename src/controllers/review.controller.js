import ReviewService from '../services/review.service.js';
import ReviewDTO from '../dtos/review.dto.js';

class ReviewController {

  static async create(req, res, next) {
    try {
      // ID vem do middleware de autenticação
      const usuarioId = req.user.id;
      const reviewData = req.body;
      
      const review = await ReviewService.create(usuarioId, reviewData);
      res.status(201).json(new ReviewDTO(review));
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const reviews = await ReviewService.findAll();
      res.status(200).json(reviews.map(r => new ReviewDTO(r)));
    } catch (error) {
      next(error);
    }
  }

  static async getByGame(req, res, next) {
    try {
      const gameId = req.params.gameId;
      const reviews = await ReviewService.getByGameId(gameId);
      res.status(200).json(reviews.map(r => new ReviewDTO(r)));
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const reviewId = req.params.id;
      const userId = req.user.id;
      const userRole = req.user.role;

      await ReviewService.delete(reviewId, userId, userRole);

      res.status(200).json({ message: 'Review deletada com sucesso.' });
    } catch (error) {
      next(error);
    }
  }
}

export default ReviewController;