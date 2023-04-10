const mongoose = require('mongoose');
const boxSchema = new mongoose.Schema({
    box: {
        type: String,
        unique: true,
        required: false
    }
}, {
    collection: 'box'
})
const Box = mongoose.model("Box", boxSchema);

module.exports = Box;