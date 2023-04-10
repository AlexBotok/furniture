const mongoose = require('mongoose');
const mechanismSchema = new mongoose.Schema({
    mechanism: {
        type: String,
        unique: true,
        required: false
    }
}, {
    collection: 'mechanism'
})
const Mechanism = mongoose.model("Mechanism", mechanismSchema);

module.exports = Mechanism;