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
    },
    brand: {
        type: String,
        required: true,
        unique: false
    },
    mechanism:{
        type: String,
        required: true,
        unique: false
    },
    extender:{
        type: String,
        required: true,
        unique: false
    },
    frame:{
        type: String,
        required: true,
        unique: false
    },
    box:{
        type: String,
        required: true,
        unique: false
    },
    city:{
        type: String,
        required: true,
        unique: false 
    }

}, {
    collection: 'product'
})
const Product = mongoose.model("Product", productSchema);

module.exports = Product;