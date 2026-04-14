const express = require('express');
const { readSheet, appendRow, updateRow, deleteRow } = require('../utils/excel');
const { authenticateToken, requireRole } = require('../middleware/auth');

const router = express.Router();

// GET /api/jobs — Public
router.get('/', async (req, res) => {
  try {
    const jobs = await readSheet('Jobs');
    const parsed = jobs.map(j => ({
      ...j,
      id: parseInt(j.id),
    }));
    res.json(parsed);
  } catch (err) {
    console.error('Error reading jobs:', err);
    res.status(500).json({ error: 'Failed to load jobs' });
  }
});

// POST /api/jobs — Admin only
router.post('/', authenticateToken, requireRole('admin'), async (req, res) => {
  try {
    const { title, location, type, department, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }
    const newJob = await appendRow('Jobs', {
      title,
      location: location || '',
      type: type || 'Full-time',
      department: department || '',
      description,
    });
    res.status(201).json(newJob);
  } catch (err) {
    console.error('Error creating job:', err);
    res.status(500).json({ error: 'Failed to create job' });
  }
});

// PUT /api/jobs/:id — Admin only
router.put('/:id', authenticateToken, requireRole('admin'), async (req, res) => {
  try {
    const { title, location, type, department, description } = req.body;
    const updated = await updateRow('Jobs', req.params.id, {
      title,
      location: location || '',
      type: type || 'Full-time',
      department: department || '',
      description,
    });
    if (!updated) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json(updated);
  } catch (err) {
    console.error('Error updating job:', err);
    res.status(500).json({ error: 'Failed to update job' });
  }
});

// DELETE /api/jobs/:id — Admin only
router.delete('/:id', authenticateToken, requireRole('admin'), async (req, res) => {
  try {
    const deleted = await deleteRow('Jobs', req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json({ message: 'Job deleted' });
  } catch (err) {
    console.error('Error deleting job:', err);
    res.status(500).json({ error: 'Failed to delete job' });
  }
});

module.exports = router;
