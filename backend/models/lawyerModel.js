const mongoose = require('mongoose');

const lawyerSchema = new mongoose.Schema({
    barId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    preferredType: {
        type: String,
        required: true
    },
    yoe: {
        type: String,
        required: true
    },
    fees: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    feeStructure: {
        type: String,
        required: true
    },
    dob:{
        type: Date,
        required: true
    }
});

const lawyerCollection = mongoose.model("lawyer", lawyerSchema);

module.exports = lawyerCollection;