const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EntrySchema = new Schema({
    entryId: {
        type: String,
        required: true
    },
    userID: {
        type: String
    },
    businessID: {
        type: String
    }
});

const Entry = mongoose.model('entry', EntrySchema);
module.exports = Entry;