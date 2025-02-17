import ticketModel from '../models/ticket.models.js';

export async function getAllTickets(req, res) {
    try {
        const tickets = await ticketModel.find();
        if (tickets.length === 0) {
            return res.status(404).json({ message: 'Nenhum ticket encontrado' });
        }
        return res.status(200).json(tickets);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export async function getElementById(req, res) {
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(400).json({ message: 'ID do ticket é obrigatório' });
        }

        const ticket = await ticketModel.findById(id);
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket não encontrado' });
        }
        return res.status(200).json(ticket);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export async function createTicket(req, res) {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Acesso negado" });
    }

    const { name, type, quantity, price, description } = req.body;
    try {
        if (!name || !type || !quantity || !price || !description) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
        }

        if (isNaN(quantity) || isNaN(price)) {
            return res.status(400).json({ message: 'Quantity e price devem ser números válidos' });
        }

        const ticket = new ticketModel({ name, type, quantity, price, description });
        await ticket.save();

        return res.status(201).json(ticket);
    } catch (err) {
        return res.status(500).json({ error: 'Erro ao criar o ticket: ' + err.message });
    }
};

export async function updateTicket(req, res) {
    // Verificar admin
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Acesso negado" });
    }

    const { id } = req.params;
    const { name, type, quantity, price, description } = req.body;

    try {
        if (!id) {
            return res.status(400).json({ message: 'ID do ticket é obrigatório' });
        }

        if (isNaN(quantity) || isNaN(price)) {
            return res.status(400).json({ message: 'Quantity e price devem ser números válidos' });
        }

        const updatedTicket = await ticketModel.findOneAndUpdate(
            { _id: id },
            { name, type, quantity, price, description },
            { new: true }
        );

        if (!updatedTicket) {
            return res.status(404).json({ message: 'Ticket não encontrado' });
        }

        return res.status(200).json({ message: 'Ticket atualizado', ticket: updatedTicket });
    } catch (err) {
        return res.status(500).json({ error: 'Erro ao atualizar o ticket: ' + err.message });
    }
};

export async function deleteTicket(req, res) {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Acesso negado" });
    }

    const { id } = req.params;
    try {
        if (!id) {
            return res.status(400).json({ message: 'ID do ticket é obrigatório' });
        }

        const ticket = await ticketModel.findOneAndDelete({ _id: id });
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket não encontrado' });
        }

        return res.status(200).json({ message: 'Ticket deletado' });
    } catch (err) {
        return res.status(500).json({ error: 'Erro ao deletar o ticket: ' + err.message });
    }
};

const ticketController = {
    getAllTickets,
    getElementById,
    createTicket,
    updateTicket,
    deleteTicket,
};

export default ticketController;