const mongoose = require("mongoose");
const itemsScheme = new mongoose.Schema({
    // _id: Number,
    name: {
        type: String,
        required: true,
        trim: true
    },
    images: {
        type: String,
        required: true,
        trim: true
    },
    Pass: {
        type: String,
        required: true,
        trim: true
    },
    count: {
        type: String,
        required: true,
        trim: true,
        default: 0,
    },
    price: {
        type: Number,
        required: true,
        trim: true
    }
})
const items = new mongoose.model('items', itemsScheme);
module.exports = items;