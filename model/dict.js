const mongoose = require('mongoose');
const config = require('../config/database');

const word = mongoose.Schema({
    word: {
        type: String
    },
    meaning: {
        type: String
    }
});


const letter = module.exports = mongoose.model('Data', word);