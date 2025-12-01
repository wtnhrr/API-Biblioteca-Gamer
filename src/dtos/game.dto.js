class GameDTO {
  constructor(game) {
    this.id = game._id;
    this.titulo = game.titulo;
    this.genero = game.genero;
    this.plataforma = game.plataforma;
    this.anoLancamento = game.anoLancamento;
    this.preco = game.preco;
  }
}

export default GameDTO;