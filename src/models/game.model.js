import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  titulo: { type: String, required: [true, 'O campo titulo é obrigatório.'] },
  genero: { type: String, required: [true, 'O campo genero é obrigatório.'] },
  plataforma: { type: String },
  anoLancamento: { type: Number },
  preco: { type: Number, required: true, default: 0, min: 0 }
});

const Game = mongoose.model('Game', gameSchema);

export default Game;