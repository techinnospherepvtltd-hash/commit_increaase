const express = require('express');
const { readSheet, appendRow, updateRow, deleteRow } = require('../utils/excel');
const { authenticateToken, requireRole } = require('../middleware/auth');

const router = express.Router();

// GET /api/projects — Public
router.get('/', async (req, res) => {
  try {
    const projects = await readSheet('Projects');
    // Parse technologies string back to array
    const parsed = projects.map(p => ({
      ...p,
      id: parseInt(p.id),
      featured: p.featured === true || p.featured === 'true',
      technologies: typeof p.technologies === 'string'
        ? p.technologies.split(',').map(t => t.trim()).filter(Boolean)
        : p.technologies || [],
    }));
    res.json(parsed);
  } catch (err) {
    console.error('Error reading projects:', err);
    res.status(500).json({ error: 'Failed to load projects' });
  }
});

// POST /api/projects — Admin or Employee
router.post('/', authenticateToken, requireRole('admin', 'employee'), async (req, res) => {
  try {
    const { title, description, technologies, region, featured, image } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }
    const techString = Array.isArray(technologies) ? technologies.join(',') : (technologies || '');
    const newProject = await appendRow('Projects', {
      title,
      description,
      technologies: techString,
      region: region || '',
      featured: featured || false,
      image: image || '',
    });
    res.status(201).json(newProject);
  } catch (err) {
    console.error('Error creating project:', err);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// PUT /api/projects/:id — Admin only
router.put('/:id', authenticateToken, requireRole('admin'), async (req, res) => {
  try {
    const { title, description, technologies, region, featured, image } = req.body;
    const techString = Array.isArray(technologies) ? technologies.join(',') : (technologies || '');
    const updated = await updateRow('Projects', req.params.id, {
      title,
      description,
      technologies: techString,
      region: region || '',
      featured: featured || false,
      image: image || '',
    });
    if (!updated) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(updated);
  } catch (err) {
    console.error('Error updating project:', err);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// DELETE /api/projects/:id — Admin only
router.delete('/:id', authenticateToken, requireRole('admin'), async (req, res) => {
  try {
    const deleted = await deleteRow('Projects', req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json({ message: 'Project deleted' });
  } catch (err) {
    console.error('Error deleting project:', err);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

module.exports = router;
