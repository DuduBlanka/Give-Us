const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    num: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    association: {
        type: String,
        required: false,
    },
    type: {
        type: String,
        required: true,
    },
    dateMade: {
        type: String,
        required: true,
    },
    dateDelete:{
        type: String,
        required: true,
    },
    delivered: {
        type: String,
        required: true,
    },
    numItems: {
        type: String,
        required: false,
    },
    food: {
        type: [{
          foodType: String,
          quantity: String,
          unit: String
        }],
        required: true,
    },
});

const DonationDeleteModal = mongoose.model("donationDelete", UserSchema);
module.exports = DonationDeleteModal;