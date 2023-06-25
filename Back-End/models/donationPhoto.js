const mongoose = require('mongoose');

const PhotoDonationSchema = new mongoose.Schema({
    num: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    photo: Buffer,
});

const DonationPhotoModal = mongoose.model('donationPhoto', PhotoDonationSchema);
module.exports = DonationPhotoModal;
