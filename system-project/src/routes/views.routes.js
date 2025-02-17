import express from 'express';
const router = express.Router();
import validation from '../middlwares/validation.js';


// TODO pagina de login
router.get('/login', async (req, res) => {
    res.render('/login')
})
// TODO pagina de resgistro
router.get('/register', async (req, res) => {
    res.render('/register');
});

// Todo dahsboard
router.get('/dashboard',validation, async (req, res) => {
    const tickets = await Ticket.find();
    res.render('/dashboard', {name: req.user.name, tickets});
});

// TODO pagina de compras
router.get('/purchase/:id', async (req, res) => {
    const purchase = await Purchase.findById(req.params.id);
    if(!purchase) {
        res.status(404).send('Compra não efetuada');
        return;
    }
    res.render('/purchase', {purchase});
});

// Todo historico de compras
router.get('/history', async (req, res) => {
    const purchases = await Purchase.find({user: req.user._id}).populate('ticketType');
    if(!purchases) {
        res.status(404).send('Compras não não encontrada');
        return;
    }
    res.render('/history', {purchases});
});
// TODO detalhes do ingresso
router.get('/purchase/:id', async (req, res) => {
    const purchase = await Purchase.find({_id: req.params.id ,user: req.user.id}).populate('ticketType');
    if(!purchase) {
        res.status(404).send('Compra não efetuada');
        return;
    }
    res.render('/purchaseDetails', {purchase});

});

export default router;