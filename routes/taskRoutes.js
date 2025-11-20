const express = require('express');
const router = express.Router();
const { models } = require('../db');
const { Task: TaskModel } = models;

// POST /tasks - Új feladat létrehozása
router.post('/', async (req, res) => {
  try {
    const { title, description, userId } = req.body;

    if (!title || !userId) {
      return res.status(400).json({ error: 'A "title" és "userId" mezők kitöltése kötelező.' });
    }
    const newTask = await TaskModel.create({ title, description, userId });
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Hiba az új feladat létrehozásakor:', error);
    res.status(500).json({ error: 'Szerveroldali hiba.' });
  }
});

// GET /tasks - Összes feladat lekérdezése
router.get('/', async (req, res) => {
  try {
    const tasks = await TaskModel.findAll();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Hiba a feladatok lekérdezésekor.' });
  }
});

module.exports = router;
