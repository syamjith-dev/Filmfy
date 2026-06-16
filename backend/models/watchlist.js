const mongoose = require("mongoose");

const watchlistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },

    movieId: {
        type: Number,
        required: true
    },

    title: String,
    poster: String,
    backdrop: String,
    vote_average: Number,
    original_language: String,
    overview: String,

}, { timestamps: true });

module.exports = mongoose.model("watchlist", watchlistSchema)