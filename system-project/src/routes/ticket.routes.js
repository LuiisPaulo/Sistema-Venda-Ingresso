import express from 'express';
const router = express.Router();
import ticketController from '../controllers/ticket.controller';

router.post('/ticket', ticketController.createTicket);

exports.modules = router;
