const express = require('express');
const router = express.Router();
const Player = require('../models/playerModel');

// GET all players data
router.get('/', async (req, res) => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new player data
router.post('/', async (req, res) => {
  const player = new Player({
    name: req.body.name,
    role: req.body.role,
    age: req.body.age,
    style: req.body.style,
    battingAvg: req.body.battingAvg,
  });

  try {
    const newPlayer = await player.save();
    res.status(201).json(newPlayer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH a player data
router.patch('/:id', async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) return res.status(404).json({ message: "Player not found" });

    if (req.body.name) player.name = req.body.name;
    if (req.body.role) player.role = req.body.role;
    if (req.body.age) player.age = req.body.age;
    if (req.body.style) player.style = req.body.style;
    if (req.body.battingAvg) player.battingAvg = req.body.battingAvg;

    const updatedPlayer = await player.save();
    res.json(updatedPlayer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a player data
router.delete('/:id', async (req, res) => {
  try {
    const player = await Player.findByIdAndDelete(req.params.id);
    if (!player) return res.status(404).json({ message: "Player not found" });

    res.json({ message: "Player deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
