const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: false
    },
    price: {
        type: Number,
        required: true,
        unique: false
    },
    type: {
        type: String,
        required: true,
        unique: false
    },
    title: {
        type: String,
        required: true,
        unique: false
    },
    instock: {
        type: Number,
        required: true,
        unique: false
    },
    imgsrc: {
        type: String,
        required: true,
        unique: false
    }

}, {
    collection: 'product'
})
const Product = mongoose.model("Product", productSchema);

module.exports = Product;