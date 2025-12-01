import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import path from 'path';
import { fileURLToPath } from 'url';

// --- CONFIGURAÇÃO ROBUSTA DO AMBIENTE ---
// Isso garante que o script encontre o .env na raiz, não importa de onde você rode o comando
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Importar os Modelos
import User from '../models/user.model.js';
import Game from '../models/game.model.js';
import Review from '../models/review.model.js';

const mongoUri = process.env.MONGO_URI;

// Verificação de Segurança
if (!mongoUri) {
  console.error("❌ ERRO FATAL: A variável MONGO_URI não foi encontrada.");
  console.error("Verifique se o arquivo .env existe na raiz do projeto e contém a chave MONGO_URI.");
  process.exit(1);
}

const seedDatabase = async () => {
  try {
    // 1. Conectar ao MongoDB
    console.log("🔌 Tentando conectar ao MongoDB...");
    await mongoose.connect(mongoUri);
    console.log("✅ Conectado!");

    // 2. Limpar todas as coleções (Começar do zero)
    console.log("🧹 Limpando banco de dados...");
    await User.deleteMany({});
    await Game.deleteMany({});
    await Review.deleteMany({});

    // 3. Criar Hashes de Senha
    const salt = await bcrypt.genSalt(10);
    const hashAdmin = await bcrypt.hash('admin123', salt);
    const hashUser = await bcrypt.hash('user123', salt);

    // 4. Criar Jogos
    const games = await Game.create([
      { 
        titulo: "The Legend of Zelda: Breath of the Wild", 
        genero: "Aventura", 
        plataforma: "Switch", 
        anoLancamento: 2017, 
        preco: 299.90 
      },
      { 
        titulo: "God of War Ragnarök", 
        genero: "Ação", 
        plataforma: "PS5", 
        anoLancamento: 2022, 
        preco: 349.90 
      },
      { 
        titulo: "Elden Ring", 
        genero: "RPG", 
        plataforma: "PC", 
        anoLancamento: 2022, 
        preco: 249.90 
      },
      { 
        titulo: "Hollow Knight", 
        genero: "Metroidvania", 
        plataforma: "PC", 
        anoLancamento: 2017, 
        preco: 49.90 
      },
      { 
        titulo: "Cyberpunk 2077", 
        genero: "RPG", 
        plataforma: "Xbox", 
        anoLancamento: 2020, 
        preco: 199.90 
      }
    ]);
    console.log(`🎮 ${games.length} Jogos criados.`);

    // 5. Criar Utilizadores
    const users = await User.create([
      { 
        nome: "Administrador Chefe", 
        email: "admin@teste.com", 
        senha: hashAdmin, 
        role: "admin",
        saldo: 0 
      },
      { 
        nome: "Jogador Comum", 
        email: "user@teste.com", 
        senha: hashUser, 
        role: "user",
        saldo: 500.00, 
        // Adiciona Elden Ring e Hollow Knight à biblioteca
        biblioteca: [games[2]._id, games[3]._id] 
      }
    ]);
    console.log(`👥 ${users.length} Utilizadores criados.`);

    const userComum = users[1];

    // 6. Criar Reviews
    await Review.create([
      {
        usuario: userComum._id,
        game: games[2]._id, // Elden Ring
        nota: 5,
        comentario: "Obra prima absoluta. O mundo aberto é incrível!"
      },
      {
        usuario: userComum._id,
        game: games[3]._id, // Hollow Knight
        nota: 4,
        comentario: "Muito difícil, mas a arte é linda."
      }
    ]);
    console.log("⭐ Reviews criadas.");

    console.log("✅ SEED CONCLUÍDO COM SUCESSO!");
    process.exit(0);

  } catch (error) {
    console.error("❌ Erro no seed:", error);
    process.exit(1);
  }
};

seedDatabase();