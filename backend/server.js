require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch(err => {
        console.log(err);
    });

app.use("/api/auth", require("./routes/auth"));

const watchlistRoutes =
    require("./routes/watchlist");

app.use(
    "/api/watchlist",
    watchlistRoutes
);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://filmfy.netlify.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
