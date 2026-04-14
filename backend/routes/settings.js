const express = require('express');
const { readSheet, writeSheet } = require('../utils/excel');
const { authenticateToken, requireRole } = require('../middleware/auth');

const router = express.Router();

// GET /api/settings — Public
router.get('/', async (req, res) => {
  try {
    const settings = await readSheet('Settings');
    const obj = {};
    settings.forEach(s => {
      obj[s.key] = s.value;
    });
    res.json(obj);
  } catch (err) {
    console.error('Error reading settings:', err);
    res.status(500).json({ error: 'Failed to load settings' });
  }
});

// PUT /api/settings — Admin only
router.put('/', authenticateToken, requireRole('admin'), async (req, res) => {
  try {
    const updates = req.body;
    const settings = await readSheet('Settings');

    Object.entries(updates).forEach(([key, value]) => {
      const existing = settings.find(s => s.key === key);
      if (existing) {
        existing.value = value;
      } else {
        const maxId = settings.reduce((max, s) => Math.max(max, parseInt(s.id) || 0), 0);
        settings.push({ id: maxId + 1, key, value });
      }
    });

    await writeSheet('Settings', settings);
    const obj = {};
    settings.forEach(s => { obj[s.key] = s.value; });
    res.json(obj);
  } catch (err) {
    console.error('Error updating settings:', err);
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

module.exports = router;
