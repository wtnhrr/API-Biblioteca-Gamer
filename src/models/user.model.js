import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  nome: { type: String, required: [true, 'O campo nome é obrigatório.'] },
  email: { type: String, required: [true, 'O campo email é obrigatório.'], unique: true },
  senha: { type: String, required: [true, 'O campo senha é obrigatório.'] },
  role: { type: String, required: true, enum: ['user', 'admin'], default: 'user' },
  saldo: { type: Number, default: 0, min: 0 },
  biblioteca: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }]
}, { timestamps: true });


const User = mongoose.model('User', userSchema);

export default User;