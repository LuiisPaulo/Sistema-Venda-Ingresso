const purchaseTicketModel = require("../models/purchaseTicket.models");
const ticketModel = require("../models/ticket.models");
const userModel = require("../models/user.models");

exports.purchaseTicket = async (req, res) => {
  try {
    const { ticketId, quantity } = req.body;
    const userId = req.user.userId;
    const ticket = await ticketModel.findById(ticketId);
    if (!ticket) {
      return res.status(400).json({ message: "Ticket nao encontrado" });
    }

    if (ticket.quantity < quantity) {
      return res.status(400).json({ message: "Quantidade insuficiente" });
    }

    const purchase = new Purchase({
      user: userId,
      ticket: ticketId,
      quantity: ticket.quantiy -= quantity,
      totalPrice: ticket.price * quantity
    });
    await purchase.save();
    return res
      .status(200)
      .json({ message: "Compra feita com sucesso", purchase });
  
    } catch (err) {
    return res
      .status(500)
      .json({ message: "Erro ao tentar fazer a compra do ticket" });
  }
};


exports.getPurchaseTicket = async (req, res) => {
  try{
    const userId = req.user.userId;
    let purchases = await purchaseTicketModel.find({ user: userId }).populate('ticket');
    return res.status(200).json({ message: "Lista de compras", purchases });
  } catch (err) { 
    return res.status(500).json({ message: "Erro ao tentar listar compras" });
  }
};
