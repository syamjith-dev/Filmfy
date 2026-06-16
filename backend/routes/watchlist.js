const express = require("express");
const router = express.Router();

const Watchlist = require("../models/watchlist");
const authMiddleware = require("../middleware/authMiddleware");


// ======================
// Add Movie To Watchlist
// ======================

router.post(
  "/add",
  authMiddleware,
  async (req, res) => {

    try {

      const {
        movieId,
        title,
        poster,
        backdrop,
        vote_average,
        original_language,
        overview

      } = req.body;

      const exists = await Watchlist.findOne({
        userId: req.user.id,
        movieId: movieId
      });

      if (exists) {
        return res.status(400).json({
          message: "Movie already added"
        });
      }

      const movie = new Watchlist({
        userId: req.user.id,
        movieId,
        title,
        poster,
        backdrop,
        vote_average,
        original_language,
        overview
      });

      await movie.save();

      res.status(201).json({
        success: true,
        message: "Movie added successfully",
        movie
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message: "Server Error"
      });

    }

  }
);


// ======================
// Get User Watchlist
// ======================

router.get(
  "/",
  authMiddleware,
  async (req, res) => {

    try {

      const movies = await Watchlist.find({
        userId: req.user.id
      });

      res.status(200).json(movies);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message: "Server Error"
      });

    }

  }
);


// ======================
// Remove Movie
// ======================

router.delete(
  "/:movieId",
  authMiddleware,
  async (req, res) => {

    console.log("req.user =", req.user);
    console.log("req.user.id =", req.user.id);
    console.log("movieId =", req.params.movieId);

    try {

      const movie = await Watchlist.findOneAndDelete({
        userId: req.user.id,
        movieId: Number(req.params.movieId),
      });

      if (!movie) {
        return res.status(404).json({
          message: "Movie not found"
        });
      }

      res.status(200).json({
        success: true,
        message: "Movie removed successfully"
      });

    } catch (error) {
      console.error("DELETE ERROR:", error);

      res.status(500).json({
        success: false,
        message: error.message
      });
    }

  }
);

module.exports = router;