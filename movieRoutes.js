const express = require('express');
const axios = require('axios');
const auth = require('../middleware/authMiddleware');
const User = require('../models/User');
const router = express.Router();

const TMDB_BASE = 'https://api.themoviedb.org/3';

router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;
    const response = await axios.get(`${TMDB_BASE}/search/movie`, {
      params: { api_key: process.env.TMDB_API_KEY, query }
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'TMDB error' });
  }
});

router.post('/favorites', auth, async (req, res) => {
  const { movieId } = req.body;
  const user = await User.findById(req.user.id);
  if (!user.favorites.includes(movieId)) {
    user.favorites.push(movieId);
    await user.save();
  }
  res.json({ favorites: user.favorites });
});

module.exports = router;
