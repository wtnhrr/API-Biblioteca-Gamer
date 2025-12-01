import GameService from '../services/game.service.js';
import UserService from '../services/user.service.js';
import ReviewService from '../services/review.service.js';

const getUserFromCookie = async (req) => {
    const token = req.cookies.token;
    if (!token) return null;
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return await UserService.getById(decoded.userId);
    } catch (e) {
        return null;
    }
};

class ViewController {
  static async renderDashboard(req, res) {
    try {
      const games = await GameService.getAll();
      res.render('dashboard', { games, page: 'dashboard' });
    } catch (error) {
      console.error(error);
      res.status(500).send("Erro ao carregar dashboard");
    }
  }

  static async renderStore(req, res) {
    try {
      const games = await GameService.getAll();
      res.render('loja', { games, page: 'loja' });
    } catch (error) {
      console.error(error);
      res.status(500).send("Erro ao carregar loja");
    }
  }

  static async renderGameDetails(req, res) {
    try {
      const gameId = req.params.id;
      const [game, reviews] = await Promise.all([
        GameService.getById(gameId),
        ReviewService.getByGameId(gameId)
      ]);

      if (!game) return res.status(404).send("Jogo não encontrado");
      res.render('jogo-detalhe', { game, reviews, page: 'loja' });
    } catch (error) {
      console.error(error);
      res.status(500).send("Erro ao carregar detalhes");
    }
  }

  static renderLibrary(req, res) {
    res.render('biblioteca', { page: 'biblioteca' });
  }

  static renderLogin(req, res) {
    res.render('login', { page: 'login' });
  }
}

export default ViewController;