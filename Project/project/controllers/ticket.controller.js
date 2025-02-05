const ticketModel = require('../models/ticket.models');

// para criar um ticket novo 
exports.createTicket = async (req, res) => {
    const { name, price,quantity, type } = req.body;
    try{
        if(!name || !price || !quantity || !type){
            throw new Error('Campos obrigatórios não preenchidos');
        }

        if(name.length < 4 || name.length > 20){
            throw new Error('Nome inválido');
        }
        let ticket = await ticketModel.findOne({ name, price, quantity, type });
        ticket.save();
        res.status(201).json({ message: 'Ticket cadastrado com sucesso', ticket});
    }catch(err){
        res.status(500).json({ message: 'Erro ao cadastrar o ticket' });
    } 
}

// para buscar todos os tickets 
exports.getAllTickets = async (req, res) => {
    try{
        let tickets = await ticketModel.findAll();
        res.status(200).json({ tickets });
    }catch(err){
        res.status(500).json({ message: 'Erro ao buscar os tickets' });
    }
}

// para buscar um ticket especifico 
exports.getById = async (req, res) => { 
    try{
        let ticket = await ticket.findById(req.params.id);
        if(!ticket){
            throw new Error('Ticket não encontrado');
        }
        res.status(200).json({ ticket });
    }catch(err){
        res.status(500).json({ message: 'Erro ao buscar o ticket' });
    }
}

// para atualizar o ticket 
exports.updateTicket = async (req, res) => {
    try{
        const { name, price,quantity, type } = req.body;
        let ticket = await ticketModel.findByIdAndUpdate(req.params.id, { name, price,quantity, type });
        if(!ticket){
            throw new Error('Ticket não encontrado');
        }
        res.status(200).json({ message: 'Ticket atualizado com sucesso', ticket });
        
    }catch(err){
        res.status(500).json({ message: 'Erro ao atualizar o ticket' });
    }
}

// para deletar o ticket 
exports.deleteTicket = async (req, res) => { 
     try{
        let ticket = await ticketModel.findByIdAndDelete(req.params.id);
        if(!ticket){
            throw new Error('Ticket não encontrado');
        }   
        res.status(200).json({ message: 'Ticket deletado com sucesso' });
     }catch(err){
        res.status(500).json({ message: 'Erro ao deletar o ticket' });
    }
}

