class ReviewDTO {
  constructor(review) {
    this.id = review._id;
    this.nota = review.nota;
    this.comentario = review.comentario;
    
    // nome/titulo.
    // ID -> ID.
    this.usuarioNome = review.usuario && review.usuario.nome ? review.usuario.nome : review.usuario;
    this.gameTitulo = review.game && review.game.titulo ? review.game.titulo : review.game;
    
    this.data = review.createdAt;
  }
}

export default ReviewDTO;