const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true // each note must belong to a user
    }
}, { timestamps: true });

module.exports = mongoose.model('Note', noteSchema);
