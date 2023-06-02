const mongoose = require('mongoose');

const RegionSchema = new mongoose.Schema(
    {
        username: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            unique: true,
            ref: 'User'
        },

        region: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    }

);

const Region = mongoose.model('Region', RegionSchema);

module.exports = Region;