
const mongoose = require("mongoose").default;
const Chessmate = mongoose.model("Chessmate", new mongoose.Schema({
    name: String,
    elo: Number,
    region: String
}));

chessmate1.save();