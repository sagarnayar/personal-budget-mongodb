const mongoose = require("mongoose")
let url = 'mongodb://127.0.0.1:27017';

const budgetSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    budget:{
        type: Number,
        required: true,
    },
    color:{
        type: String,
        required: true,
    }
}, { collection: 'budgetData'})

module.exports = mongoose.model('budgetData', budgetSchema)