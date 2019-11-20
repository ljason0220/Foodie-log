const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EntrySchema = new Schema({
    entryId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    added_date: {
        type: Date,
        default: Date.now
    }
});

const Entry = mongoose.model('entry', EntrySchema);
module.exports = Entry;