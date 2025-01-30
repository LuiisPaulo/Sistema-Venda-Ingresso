const mongoose = require('mongoose');

const ticketSchema = new mongoose({
    name:{
        type: String,
        required: true,
        unique: true,
        minlength: 4,
        maxlength: 20
    },

    price:{
        type: Number,
        required: true,
        unique: true
    },

    quantity:{
        type: Number,
        required: true,
        unique: true
    },

    type:{
        type: String,
        required: true,
        unique: true,
        minlength: 2,
        maxlength: 20
    },

    timestamps: true,
});

module.exports = ticketSchema('ticket', ticketSchema);