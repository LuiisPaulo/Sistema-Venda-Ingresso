const express = require('express');
const ticketController = require('../controllers/ticket.controller');
const validador = require('../middlewares/validation.middlewares');

const router = express.Router();

router.get('/ticket', ticketController.getAllTickets);
router.get('/ticket/:id', validador.validation ,ticketController.getById);
router.post('/ticket', validador.isAdmin, ticketController.createTicket);
router.put('/ticket/:id', validation.isAdmin, ticketController.updateTicket);
router.delete('/ticket/:id', validador.validation, validador.isAdmin, ticketController.deleteTicket);

module.exports = router;