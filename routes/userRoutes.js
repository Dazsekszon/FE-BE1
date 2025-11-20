const express = require('express');
const router = express.Router();
const { models } = require('../db');
const { User: UserModel } = models;

// POST /users - Új felhasználó létrehozása
router.post('/', async (req, res) => {
  try {
    const { email, name } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Az "email" mező kitöltése kötelező.' });
    }
    const newUser = await UserModel.create({ email, name });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Hiba az új user létrehozásakor:', error);
    res.status(500).json({ error: 'Szerveroldali hiba.' });
  }
});

// GET /users - Összes felhasználó lekérdezése
router.get('/', async (req, res) => {
  try {
    const users = await UserModel.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Hiba a felhasználók lekérdezésekor.' });
  }
});

module.exports = router;
