import mongoose from 'mongoose';
require('dotenv').config();

const connectDB = async () => {
    try{
        const connection = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: true,
            useCreateClient: true,
        });
        console.log('Banco de Dados Conectado');
        return connection;
    }catch(err){
        console.log('Banco de Dados nao Conectado');
        throw err;
    }
}

exports.modules = connectDB();