import express from 'express';
const router = express.Router();
import ticketController from '../controllers/ticket.controller.js';

router.post('/ticket', ticketController.createTicket);

export default router;
