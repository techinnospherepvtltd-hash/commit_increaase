require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Check if database exists, if not suggest running seed
const dataFile = path.join(__dirname, '..', 'data', 'techinnosphere_data.xlsx');
if (!fs.existsSync(dataFile)) {
  console.warn('\n⚠️  Database file not found!');
  console.warn('   Run: cd server && npm run seed\n');
}

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/services', require('./routes/services'));
app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/users', require('./routes/users'));
app.use('/api/settings', require('./routes/settings'));

// Contact form endpoint (stores nothing, just acknowledges)
app.post('/api/contact', (req, res) => {
  const { name, email, company, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }
  console.log(`📩 Contact form submission from ${name} <${email}>`);
  res.json({ message: 'Message received! We will get back to you within 24 hours.' });
});

// Serve static files from built React app
const distPath = path.join(__dirname, '..', 'frontend', 'dist');
app.use(express.static(distPath));

// Handle all other routes - send React index.html for React Router
app.get('*', (req, res) => {
  // Only serve index.html if it exists (meaning the app has been built)
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).json({ error: 'Frontend not built. Run npm run build first.' });
  }
});

app.listen(PORT, () => {
  console.log(`\n🚀 TechInnoSphere API Server running on http://localhost:${PORT}`);
  console.log(`   API:      http://localhost:${PORT}/api`);
  console.log(`   Database: ${dataFile}\n`);
});
