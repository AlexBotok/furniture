const mongoose = require('mongoose');
const frameSchema = new mongoose.Schema({
    frame: {
        type: String,
        unique: true,
        required: false
    }
}, {
    collection: 'frame'
})
const Frame = mongoose.model("Frame", frameSchema);

module.exports = Frame;