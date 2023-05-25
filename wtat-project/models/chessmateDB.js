    ``
const mongoose = require("mongoose").default;
const Chessmate = mongoose.model("Chessmate", new mongoose.Schema({
    name: String,
    elo: Number,
    region: String
}));

const chessmate1 = new Chessmate({
    name: "Deez Nuts",
    elo: 4444,
    region: "NA"
});

chessmate1.save();