import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

console.log('MONGO_URI:', process.env.MONGO_URI); 
 
const connectDB = async () => {
    try{
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log('Banco de Dados Conectado');
        return connection;
    }catch(err){
        console.log('Banco de Dados nao Conectado');
        throw err;
    }
}

export default connectDB;