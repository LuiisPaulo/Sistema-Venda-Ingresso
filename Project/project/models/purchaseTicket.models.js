const mongoose = require('mongoose');

const purchaseTicketSchema = new mongoose({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true 
    },

    tickets:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket',
        required: true,
        unique: true 
    },
    quantity:{
        type: Number,
        required: true,
        unique: true
    },
    totalPrice:{
        type: Number,
        required: true,
    },

    timestamps: true,
});

module.exports = purchaseTicketSchema('purchaseTicket', purchaseTicketSchema);