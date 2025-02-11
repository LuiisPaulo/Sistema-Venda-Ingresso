// TODO -> criar arquivo de configuração de banco de dados
// TODO -> refazer sozinho essa classe 
import mongoose from 'mongoose';
require('dotenv').config();

const connectDB = async () => {
    try{
        const connection = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        console.log('Conectado com sucesso ao banco de dados');
        return connection;
    }catch(err){
        console.log('Erro ao conectar ao banco de dados');
        throw err;
    }
};

export default connectDB;