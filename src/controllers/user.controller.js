import UserService from '../services/user.service.js';

class UserController {

    static async getAll(req, res) {
        try {
            const users = await UserService.getAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ mensagem: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const id = req.params.id;
            const user = await UserService.getById(id);
            res.status(200).json(user);
        } catch (error) {
            res.status(error.statusCode || 500).json({ mensagem: error.message });
        }
    }

    static async create(req, res) {
        try {
            const userData = req.body;
            const newUser = await UserService.create(userData);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(error.statusCode || 500).json({ mensagem: error.message });
        }
    }

    static async update(req, res) {
        try {
            const id = req.params.id;
            const userData = req.body;
            const updatedUser = await UserService.update(id, userData);
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(error.statusCode || 500).json({ mensagem: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const id = req.params.id;
            await UserService.delete(id);
            res.status(204).send();
        } catch (error) {
            res.status(error.statusCode || 500).json({ mensagem: error.message });
        }
    }
}

export default UserController;