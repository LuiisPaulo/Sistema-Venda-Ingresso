import mongoose from 'mongoose';


const ticketSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true, unique: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true, minLength: 5, maxLength: 40 },

    timestamp: { type: Date, default: Date.now },
});

const Ticket = mongoose.models.Ticket || mongoose.model('Ticket', ticketSchema); 
export default Ticket;