const express = require('express');
const purchasseTicketController = require('../controllers/purchaseTicket.controller');
const validador = require('../middlewares/validation.middlewares');

const router = express.Router();

router.get('/purchaseTicket', validador.validation, purchasseTicketController.getPurchaseTicket);
router.post('/purchaseTicket', validador.validation, purchasseTicketController.purchaseTicket);

module.exports = router;