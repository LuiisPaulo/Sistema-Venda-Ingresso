import mongoose from 'mongoose';

const purchaseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
    },

    ticket: {
        type: mongoose.Schema.Types.ObjectId,
    },

    price: {
        type: mongoose.Schema.Types.Number,
    },

    // implementar a logica de negocio

    totalPrice: {

    },

    timestamp: { type: Date, default: Date.now },
});

const purchaseModel = mongoose.model('Purchase', purchaseSchema);
export default purchaseModel;