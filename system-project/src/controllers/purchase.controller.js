import purchaseModel from '../models/purchase.model';
import ticketModel from '../models/ticket.models';

// TODO -> criar função de compra
exports.buyTicket = async (req, res) => {
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


// TODO -> criar função para verificar historico de compra
exports.viewPurchase = async (req, res) => {
    const { id } = req.params;
    try{
        const purchase = await purchaseModel.find({ user: req.user._id, id }).populate('ticket');
        if(!purchase){
            return res.status(404).json({ message: "Erro ao encontrar a compra" });
        }
        res.reder('/history', { purchase });
    }catch(err){
        return res.status(500).json({error: 'Erro ao visualizar a compra'});
    }; 
};
