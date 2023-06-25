const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    createdAt:{
        type:Date
    }
    /* createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600,
    }, */
});

const TokenModal = mongoose.model("token", tokenSchema);
module.exports = TokenModal;
