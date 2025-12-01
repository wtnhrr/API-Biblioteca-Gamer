class UserDTO {
  constructor(user) {
    this.id = user._id;
    this.nome = user.nome;
    this.email = user.email;
    this.role = user.role;
    this.saldo = user.saldo;
    this.biblioteca = user.biblioteca.map(game => 
      (game.titulo) ? game.titulo : game
    );
  }
}

export default UserDTO;