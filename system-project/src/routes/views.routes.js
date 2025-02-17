import express from 'express';
const router = express.Router();
import validation from '../middlwares/validation.js';
import Ticket from '../models/ticket.models.js';
import Purchase from '../models/purchase.models.js';

// TODO pagina de login
router.get('/login', async (req, res) => {
    res.render('login');
});

// TODO pagina de registro
router.get('/register', async (req, res) => {
    res.render('register');
});

// TODO dashboard
router.get('/dashboard', validation, async (req, res) => {
    if (!req.user) {
        return res.status(401).send('User not authenticated');
    }

    const tickets = await Ticket.find();
    res.render('dashboard', {name: req.user.name, tickets});
});

// TODO pagina de compras
router.get('/purchase/:id', async (req, res) => {
    const purchase = await Purchase.findById(req.params.id);
    if (!purchase) {
        return res.status(404).send('Compra não efetuada');
    }
    res.render('purchase', {purchase});
});

// TODO historico de compras
router.get('/history', async (req, res) => {
    if (!req.user) {
        return res.status(401).send('User not authenticated');
    }

    const purchases = await Purchase.find({user: req.user._id}).populate('ticketType');
    if (!purchases || purchases.length === 0) {
        return res.status(404).send('Compras não encontradas');
    }
    res.render('history', {purchases});
});

// TODO detalhes do ingresso
router.get('/purchase/:id', async (req, res) => {
    if (!req.user) {
        return res.status(401).send('User not authenticated');
    }

    const purchase = await Purchase.find({_id: req.params.id, user: req.user._id}).populate('ticketType');
    if (!purchase) {
        return res.status(404).send('Compra não efetuada');
    }
    res.render('purchaseDetails', {purchase});
});

export default router;
