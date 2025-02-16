import express from 'express';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import mustache from 'mustache-express';
import path from 'path';
import database from '../src/config/db.js';
import router from '../src/routes/auth.routes.js';
import validation from '../src/middlwares/validation.js';
import ticketRoutes from '../src/routes/ticket.routes.js';
import purchaseRoutes from '../src/routes/purchase.routes.js';
import viewsRoutes from '../src/routes/views.routes.js';
import swagger from '../src/swagger/documentation.js';


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
app.engine('mustache', mustache());
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

