// TODO implementar o app
const express = require('express');
const cors = require('cors');
const { validation } = require('./middlewares/validation.middlewares');
const errorHandler = require('./utils/errorHanderls');
const authRoutes = require('./routes/auth.routes');
const ticketRoutes = require('./routes/ticket.routes');
const purchaseTicketRoutes = require('./routes/purchaseTicket.routes');
const { connect } = require('mongoose');

const app = express();

// Conecta o banco de dados - verificar se dara bom 
connect();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// TODO implementar chamaados para as classes views


// TODO implementar chamado para rotas 
app.use('/auth', validation, authRoutes);
app.use('/tickets', validation, ticketRoutes);
app.use('/purchase', validation, purchaseTicketRoutes);

app.use = async (req, res, next) => {
  try {
    await next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// TODO implementar o dotenv 

app.listes(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});