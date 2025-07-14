const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: [{ type: String }], // Store TMDB movie IDs
  watchlists: [{
    name: String,
    movies: [String]
  }],
  reviews: [{
    movieId: String,
    rating: Number,
    comment: String
  }]
});

module.exports = mongoose.model('User', userSchema);
