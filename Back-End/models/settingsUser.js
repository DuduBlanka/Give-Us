const mongoose = require('mongoose');

const UserSettings = new mongoose.Schema({
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
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    emailAgree:{
        type: String,
        required: true,
    },
    phoneAgree: {
        type: String,
        required: true,
    },
});

const UserSettingsModal = mongoose.model("UserSettings", UserSettings);
module.exports = UserSettingsModal;
