const mongoose = require('mongoose');

const creatureSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },

    magic: {
        type: String,
        required: true,
    },

    pretty: {
        type: Boolean,
        required: true
    }

});

const Creature = mongoose.model('Creature', creatureSchema);

module.exports = Creature;
