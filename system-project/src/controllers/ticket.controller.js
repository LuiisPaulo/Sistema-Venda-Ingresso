import ticketModel from '../models/ticket.models.js';

export async function getAllTickets(req, res) {
    try{
        let ticket = await ticketModel.find();
        return res.status(200).json(ticket);
    }catch(err){
        return res.status(500).json({error: err.message});
    }
};

export async function getElementById(req, res) {
    const { id } = req.params;
    try{
        const ticket = await ticketModel.findById(id);
        if(!ticket){
            return res.status(404).json({message: 'O ticket não foi encontrado '});
        }
        return res.status(200).json(ticket);
    }catch(err){
        return res.status(500).json({error: err.message});
    }
}

export async function createTicket(req, res) {

    // verifica se o usuario tem credenciais de administrador
    if(req.user.role !== "admin"){
        return res.status(403).json({ message: "Acesso negado"});
    }

    const { name, type, quantity, price, description } = req.body;
    try{

    if(!name || !type || !quantity || !price || !description){
        throw new Error('Campos obrigatórios');
    }

    let ticket = await ticketModel({ name, type, quantity, price, description });
    ticket.save();
    return res.status(201).json(ticket);
    }catch(err){
        return res.status(500).json({error: 'Erro ao criar o ticket'});
    }
};

export async function updateTicket(req, res){

    // Verificar admin
    if(req.user.role !== "admin"){
        res.status(403).json({ message: "Acesso negado"});
    }

    const { id } = req.params;
    const { name, type, quantity, price, description } = req.body;

    if(!id){
        res.status(404).json({ message: "Erro ao encontrar o ticket" });
    }

    try{
        const updateTicket = await ticketModel.findOneAndUpdate({ _id: id },
            { name, type, quantity, price, description },
            { new: true });

        if(!updateTicket){
            res.status(404).json({ message: "Erro ao encontrar o ticket" });
        }

        return res.status(201).json({ message: "Ticket atualizado" });
    }catch(err){
        return res.status(500).json({error: 'Erro ao atualizar o ticket'});
    }

};

export async function deleteTicket(req, res) {
    // Verificar admin
    if(req.user.role !== "admin"){
        res.status(403).json({ message: "Acesso negado"});
    }

    const { id } = req.params;
    try{
        let ticket = await ticketModel.findOneAndDeletend({ _id: id });

        if(!ticket){
            return res.status(404).json({ message: "Erro ao encontrar o ticket" });
        }
        return res.status(201).json({ message: "Ticket deletado" });
    }catch(err){
        return res.status(500).json({error: 'Erro ao tentar deletar o ticket '});
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