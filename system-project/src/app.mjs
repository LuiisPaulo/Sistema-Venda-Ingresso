import express from 'express';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import mustacheExpress from 'mustache-express';
import path from 'path';
import database from '../src/config/db.js';
import router from '../src/routes/auth.routes.js';
//import validation from '../src/middlwares/validation.js';
import ticketRoutes from '../src/routes/ticket.routes.js';
import purchaseRoutes from '../src/routes/purchase.routes.js';
import viewsRoutes from '../src/routes/views.routes.js';
import dotenv from 'dotenv';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

// Requerindo variáveis do ambiente
dotenv.config();

// Iniciando o framework express
const app = express();

// Conectando banco de dados
database().then(() => {
    console.log('Servidor iniciado na porta', process.env.PORT || 3000);
}).catch((err) => {
    console.error('Erro ao iniciar servidor:', err);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.static('public'));

// Template
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, '..', 'src', 'views'));


// Rotas
app.use(viewsRoutes)
app.use(router);
app.use(ticketRoutes);
app.use(purchaseRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta http://localhost:${PORT}`);
});
