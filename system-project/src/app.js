import express from 'express';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import mustache from 'mustache-express';
import path from 'path';
import database from '../src/config/db';
import router from './routes/auth.routes';
import validation from './middlwares/validation';
import ticketRoutes from '../src/routes/ticket.routes';
import purchaseRoutes from '../src/routes/purchase.routes';
import viewsRoutes from '../src/routes/views.routes';
import swagger from '../src/swagger/documentation';


// requerindo variaveis do ambiente
require('dotenv').config();

// iniciando o framework express
const app = express ();

// conectando banco de dados
database();

app.use(express.json());
app.use(express.unlercoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.static('public'));


// tamplate
app.use(viewsRoutes);
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));

// documentacao
swagger(app);

//rotas
app.use(router);
app.use(ticketRoutes);
app.use(purchaseRoutes);

app.listen(PORT, () => {
    console.log(`Servidor iniciado`);
});

