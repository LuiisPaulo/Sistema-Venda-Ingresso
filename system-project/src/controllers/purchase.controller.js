import purchaseModel from '../models/purchase.models.js';
import ticketModel from '../models/ticket.models.js';

export async function buyTicket (req, res){
    const { ticketId, quantity } = req.body;
    const ticket = await ticketModel.findById(ticketId);
    try{
        if(!ticket || !quantity){
            return res.status(404).json({ message: "Erro ao encontrar o ticket" });
        }

        if(ticket.quantity < quantity){
            return res.status(400).json({ message: "Quantidade insuficiente" });
        }

        ticket.quantity -= quantity;
        await ticket.save();

        const purchase = await purchaseModel.create({
            user: req.user._id,
            ticket: ticket._id,
            quantity,
        });

        res.redirect('/history');

    }catch(err){
        return res.status(500).json({error: 'Erro ao realizar a compra'});
    } 
};


export async function viewPurchase(req, res) {
    const { id } = req.params;
    try{
        const purchase = await purchaseModel.find({ user: req.user._id, id }).populate('ticket');
        if(!purchase){
            return res.status(404).json({ message: "Erro ao encontrar a compra" });
        }
        res.reder('/history', { purchase });
    }catch(err){
        return res.status(500).json({error: 'Erro ao visualizar a compra'});
    }
};

const purchaseController = {
    buyTicket,
    viewPurchase,
};

export default purchaseController;