const mongoose = require('mongoose');
const extenderSchema = new mongoose.Schema({
    extender: {
        type: String,
        unique: true,
        required: false
    }
}, {
    collection: 'extender'
})
const Extender = mongoose.model("Extender", extenderSchema);

module.exports = Extender;

