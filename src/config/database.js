import mongoose from 'mongoose';
import 'dotenv/config';

const mongoUri = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log("Conectado ao MongoDB Atlas com sucesso!");
    
    // ADICIONE ESTA LINHA:
    console.log(`Base de dados conectada: ${mongoose.connection.name}`);

  } catch (error) {
    console.error("Erro ao conectar ao MongoDB Atlas:", error.message);
    process.exit(1);
  }
};

export default connectDB;