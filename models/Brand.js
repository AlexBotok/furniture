const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    brand: {
        type: String,
        unique: true,
        required: false
    }
}, {
    collection: 'brand'
})
const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;