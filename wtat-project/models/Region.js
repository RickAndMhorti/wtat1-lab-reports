const mongoose = require('mongoose');

const RegionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

const Region = mongoose.model('Region', RegionSchema);
module.exports = Region;