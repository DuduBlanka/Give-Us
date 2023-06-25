const mongoose = require('mongoose');

const NumberOfDonationsSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
    default: 0, // Initialize the count to 0
  },
});

const NumberOfDonationsModal = mongoose.model("numberOfDonations", NumberOfDonationsSchema);
module.exports = NumberOfDonationsModal;
