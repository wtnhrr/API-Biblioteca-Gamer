function rbacMiddleware(allowedRoles) {
    return (req, res, next) => {
        const user = req.user;

        if (!user || !user.role) {
            return res.status(403).json({ mensagem: "Acesso negado. Papel do usuário não identificado." });
        }
        const isAllowed = allowedRoles.includes(user.role);

        if (!isAllowed) {
            return res.status(403).json({ mensagem: "Acesso proibido. Você não tem permissão para executar esta ação." });
        }
        next();
    };
}

export default rbacMiddleware;