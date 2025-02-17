import purchaseModel from '../models/purchase.models.js';
import ticketModel from '../models/ticket.models.js';

export async function buyTicket(req, res) {
    const { ticketId, quantity } = req.body;

    try {
        const ticket = await ticketModel.findById(ticketId);
        if (!ticket) {
            return res.status(404).json({ message: "Ticket não encontrado" });
        }

        if (!quantity || quantity <= 0) {
            return res.status(400).json({ message: "Quantidade inválida" });
        }

        if (ticket.quantity < quantity) {
            return res.status(400).json({ message: "Quantidade insuficiente em estoque" });
        }

        ticket.quantity -= quantity;
        await ticket.save();

        const purchase = await purchaseModel.create({
            user: req.user._id, // Certifique-se de que req.user._id está disponível
            ticket: ticket._id,
            quantity,
        });

        res.redirect('/history');
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro ao realizar a compra' });
    }
}

export async function viewPurchase(req, res) {
    const { id } = req.params;

    try {
        const purchase = await purchaseModel.findOne({ _id: id, user: req.user._id }).populate('ticket');
        if (!purchase) {
            return res.status(404).json({ message: "Compra não encontrada" });
        }

        res.render('history', { purchase });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro ao visualizar a compra' });
    }
}

const purchaseController = {
    buyTicket,
    viewPurchase,
};

export default purchaseController;