const mongoose = require('mongoose');

const purchaseTicketSchema = new mongoose({
    ticket:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket',
        required: true,
        unique: true
    },

    price:{
        type: Number,
        requiered: true,
        unique: true,
        min: 0,
    },

    quantity:{
        type: Number,
        required: true,
        unique: true,
        min: 0
    },

    typestamp: true,
});

module.exports = purchaseTicketSchema('purchaseTicket', purchaseTicketSchema);