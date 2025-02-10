// implementando modelo do usuario
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 10
    },
    
    role: {
        type: String,
        required: true,
        enum: ['admin', 'user'],
        default: 'user'
    },

    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);