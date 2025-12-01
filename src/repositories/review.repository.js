import Review from '../models/review.model.js';

class ReviewRepository {
  
  static async create(reviewData) {
    const review = new Review(reviewData);
    return await review.save();
  }

  static async findAll() {
    return await Review.find()
      .populate('usuario', 'nome')
      .populate('game', 'titulo');
  }

  static async findByGameId(gameId) {
    return await Review.find({ game: gameId })
      .populate('usuario', 'nome')
      .populate('game', 'titulo');
  }

  static async delete(id) {
    return await Review.findByIdAndDelete(id);
  }
}

export default ReviewRepository;