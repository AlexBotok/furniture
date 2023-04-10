const mongoose = require('mongoose');
const citySchema = new mongoose.Schema({
    city: {
        type: String,
        unique: true,
        required: false
    }
}, {
    collection: 'city'
})
const City = mongoose.model("City", citySchema);

module.exports = City;