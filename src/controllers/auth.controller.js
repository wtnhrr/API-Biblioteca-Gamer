import AuthService from '../services/auth.service.js';

class AuthController {
    static async login(req, res) {
        try {
            const { email, senha } = req.body;
            if (!email || !senha) {
                return res.status(400).json({ mensagem: "Email e senha são obrigatórios." });
            }

            const token = await AuthService.login(email, senha);
            res.status(200).json({ token });

        } catch (error) {
            res.status(error.statusCode || 500).json({ mensagem: error.message });
        }
    }
}

export default AuthController