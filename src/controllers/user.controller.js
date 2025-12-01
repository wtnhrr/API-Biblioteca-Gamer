import UserService from '../services/user.service.js';
import UserDTO from '../dtos/user.dto.js';

class UserController {

  static async getAll(req, res, next) {
    try {
      const users = await UserService.getAll();

      const usersDTO = users.map(user => new UserDTO(user));
      
      res.status(200).json(usersDTO);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const id = req.params.id;
      const user = await UserService.getById(id);

      const userDTO = new UserDTO(user);
      
      res.status(200).json(userDTO);
    } catch (error) {
        next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const userData = req.body;
      const newUser = await UserService.create(userData);

      const userDTO = new UserDTO(newUser);

      res.status(201).json(userDTO);
    } catch (error) {
        next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const id = req.params.id;
      const userData = req.body;
      const updatedUser = await UserService.update(id, userData);

      const userDTO = new UserDTO(updatedUser);
      
      res.status(200).json(userDTO);
    } catch (error) {
        next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const id = req.params.id;
      await UserService.delete(id);
      res.status(204).send();
    } catch (error) {
        next(error);
    }
  }

  static async comprarJogo(req, res, next) {
    try {
      const userId = req.user.id;
      const gameId = req.params.gameId;

      const userAtualizado = await UserService.comprarJogo(userId, gameId);
      
      res.status(200).json({
        mensagem: "Compra realizada com sucesso!",
        usuario: new UserDTO(userAtualizado)
      });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;