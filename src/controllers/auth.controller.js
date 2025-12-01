import AuthService from '../services/auth.service.js';

class AuthController {
    static async login(req, res, next) {
        try {
            const { email, senha } = req.body;
            
            if (!email || !senha) {
                return res.status(400).json({ mensagem: "Email e senha são obrigatórios." });
            }

            const token = await AuthService.login(email, senha);
            
            res.cookie('token', token, { 
                httpOnly: true, 
                maxAge: 3600000 // 1 hora
            });

            res.status(200).json({ token });

        } catch (error) {
            next(error);
        }
    }

    static logout(req, res) {
        res.clearCookie('token');
        res.redirect('/loja');
    }
}

export default AuthController