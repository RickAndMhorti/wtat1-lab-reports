const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
    challenger: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    opponent: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    region: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Region'
    }
});

const Match = mongoose.model('Match', MatchSchema);
module.exports = Match;