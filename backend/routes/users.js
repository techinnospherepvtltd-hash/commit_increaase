const express = require('express');
const bcrypt = require('bcryptjs');
const { readSheet, appendRow, updateRow, deleteRow } = require('../utils/excel');
const { authenticateToken, requireRole } = require('../middleware/auth');

const router = express.Router();

// All user management routes are admin-only
router.use(authenticateToken, requireRole('admin'));

// GET /api/users — List all users (without passwords)
router.get('/', async (req, res) => {
  try {
    const users = await readSheet('Users');
    const sanitized = users.map(u => ({
      id: parseInt(u.id),
      name: u.name,
      email: u.email,
      role: u.role,
      createdAt: u.createdAt,
    }));
    res.json(sanitized);
  } catch (err) {
    console.error('Error reading users:', err);
    res.status(500).json({ error: 'Failed to load users' });
  }
});

// POST /api/users — Create a new user
router.post('/', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    // Check for existing email
    const users = await readSheet('Users');
    if (users.some(u => u.email === email)) {
      return res.status(409).json({ error: 'A user with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await appendRow('Users', {
      name,
      email,
      password: hashedPassword,
      role: role || 'employee',
      createdAt: new Date().toISOString(),
    });

    res.status(201).json({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      createdAt: newUser.createdAt,
    });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// PUT /api/users/:id — Update a user
router.put('/:id', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const updates = {};

    if (name) updates.name = name;
    if (email) updates.email = email;
    if (role) updates.role = role;
    if (password) {
      updates.password = await bcrypt.hash(password, 10);
    }

    const updated = await updateRow('Users', req.params.id, updates);
    if (!updated) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      id: updated.id,
      name: updated.name,
      email: updated.email,
      role: updated.role,
      createdAt: updated.createdAt,
    });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// DELETE /api/users/:id — Delete a user
router.delete('/:id', async (req, res) => {
  try {
    // Prevent deleting yourself
    if (String(req.user.id) === String(req.params.id)) {
      return res.status(400).json({ error: 'You cannot delete your own account' });
    }

    const deleted = await deleteRow('Users', req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

module.exports = router;
