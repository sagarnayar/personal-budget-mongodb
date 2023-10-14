const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    budget: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                // Use a regular expression to check for a valid hexadecimal color code
                return /^#[0-9A-Fa-f]{6}$/.test(value);
            },
            message: "Color must be a valid hexadecimal color code (e.g., #ED4523)",
        },
    },
}, { collection: 'budgetData' });

module.exports = mongoose.model('budgetData', budgetSchema);
