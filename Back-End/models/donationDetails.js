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
    phone: {
        type: String,
        require: true,
    },
    location: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    association: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        required: true,
        default: "Available",
    },
    rejected: {
        type: String,
        required: true,
        default: "NO",
    },
    date: {
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        required: true,
    },
    dateRejected: {
        type: Date,
        required: false,
    },
    dateRejectedString: {
        type: String,
        required: false,
    },
    type: {
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
    nameOfContact: [String],
});

const DonationDetailsModal = mongoose.model("donationDetails", UserSchema);
module.exports = DonationDetailsModal;
