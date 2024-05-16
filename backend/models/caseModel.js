const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
    defendant:
    {
        type: String,
        required: true
    },
    plaintiff:
    {
        type: String,
        required: true
    },
    plaintiffLawyer:
    {
        type: String,
        required: true
    },
    defendantLawyer:{
        type: String,
        required: true
    },
    judge:
    {
        type: String,
        required: true
    },
    caseType:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    filingDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    nextDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    status: {
        type: String,
        required: true,
        default: "In Progress"
    }
})

const caseCollection = mongoose.model('cases', caseSchema);

module.exports = caseCollection;