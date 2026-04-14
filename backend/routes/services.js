const express = require('express');
const { readSheet, appendRow, updateRow, deleteRow } = require('../utils/excel');
const { authenticateToken, requireRole } = require('../middleware/auth');

const router = express.Router();

// GET /api/services — Public
router.get('/', async (req, res) => {
  try {
    const services = await readSheet('Services');
    const parsed = services.map(s => ({
      ...s,
      id: parseInt(s.id),
    }));
    res.json(parsed);
  } catch (err) {
    console.error('Error reading services:', err);
    res.status(500).json({ error: 'Failed to load services' });
  }
});

// POST /api/services — Admin or Employee
router.post('/', authenticateToken, requireRole('admin', 'employee'), async (req, res) => {
  try {
    const { title, description, icon } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }
    const newService = await appendRow('Services', {
      title,
      description,
      icon: icon || 'Code',
    });
    res.status(201).json(newService);
  } catch (err) {
    console.error('Error creating service:', err);
    res.status(500).json({ error: 'Failed to create service' });
  }
});

// PUT /api/services/:id — Admin only
router.put('/:id', authenticateToken, requireRole('admin'), async (req, res) => {
  try {
    const { title, description, icon } = req.body;
    const updated = await updateRow('Services', req.params.id, {
      title,
      description,
      icon: icon || 'Code',
    });
    if (!updated) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json(updated);
  } catch (err) {
    console.error('Error updating service:', err);
    res.status(500).json({ error: 'Failed to update service' });
  }
});

// DELETE /api/services/:id — Admin only
router.delete('/:id', authenticateToken, requireRole('admin'), async (req, res) => {
  try {
    const deleted = await deleteRow('Services', req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json({ message: 'Service deleted' });
  } catch (err) {
    console.error('Error deleting service:', err);
    res.status(500).json({ error: 'Failed to delete service' });
  }
});

module.exports = router;
