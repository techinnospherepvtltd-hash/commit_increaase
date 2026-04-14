const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const ExcelJS = require('exceljs');

const DATA_DIR = path.join(__dirname, '..', '..', 'data');
const DATA_FILE = path.join(DATA_DIR, 'techinnosphere_data.xlsx');

async function seed() {
  console.log('🌱 Seeding TechInnoSphere database...\n');

  // Ensure data directory exists
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    console.log('📁 Created /data directory');
  }

  const workbook = new ExcelJS.Workbook();

  // ── Projects Sheet ──────────────────────────────────
  const projectsSheet = workbook.addWorksheet('Projects');
  projectsSheet.columns = [
    { header: 'id', key: 'id', width: 8 },
    { header: 'title', key: 'title', width: 40 },
    { header: 'description', key: 'description', width: 60 },
    { header: 'technologies', key: 'technologies', width: 35 },
    { header: 'region', key: 'region', width: 20 },
    { header: 'featured', key: 'featured', width: 12 },
    { header: 'image', key: 'image', width: 30 },
  ];

  const projects = [
    { id: 1, title: 'Enterprise Resource Planning Platform', description: 'A comprehensive ERP system for a multinational manufacturing company, integrating supply chain, HR, and financial operations.', technologies: 'React,Node.js,SAP ABAP,PostgreSQL', region: 'North America', featured: true, image: '' },
    { id: 2, title: 'AI-Powered Customer Analytics', description: 'Real-time customer behavior analytics platform using machine learning to drive personalized marketing strategies.', technologies: 'Python,TensorFlow,React,AWS', region: 'Europe', featured: true, image: '' },
    { id: 3, title: 'Secure Banking Mobile App', description: 'A mobile banking application with multi-factor authentication, real-time transactions, and biometric security.', technologies: 'React Native,Node.js,MongoDB', region: 'India', featured: true, image: '' },
    { id: 4, title: 'Smart Inventory Management System', description: 'IoT-integrated inventory tracking system with predictive restocking and automated supply chain optimization.', technologies: 'Vue.js,Python,IoT,Azure', region: 'Canada', featured: false, image: '' },
    { id: 5, title: 'Healthcare Patient Portal', description: 'HIPAA-compliant patient management portal with telemedicine integration, appointment scheduling, and health records.', technologies: 'Next.js,GraphQL,Docker,AWS', region: 'North America', featured: true, image: '' },
    { id: 6, title: 'E-Commerce Platform Redesign', description: 'Complete redesign and replatforming of a high-traffic e-commerce platform serving 2M+ monthly active users.', technologies: 'React,Shopify,Node.js,Redis', region: 'Europe', featured: false, image: '' },
  ];
  projects.forEach(p => projectsSheet.addRow(p));

  // ── Services Sheet ──────────────────────────────────
  const servicesSheet = workbook.addWorksheet('Services');
  servicesSheet.columns = [
    { header: 'id', key: 'id', width: 8 },
    { header: 'title', key: 'title', width: 40 },
    { header: 'description', key: 'description', width: 70 },
    { header: 'icon', key: 'icon', width: 15 },
  ];

  const services = [
    { id: 1, title: 'Software & Application Development', description: 'Custom-built software solutions from concept to deployment — web apps, mobile apps, and enterprise platforms engineered for performance and scale.', icon: 'Code' },
    { id: 2, title: 'SAP ABAP', description: 'Expert SAP ABAP development and consulting to streamline enterprise resource planning, custom reports, and business workflows.', icon: 'Database' },
    { id: 3, title: 'AI & Advanced Technology', description: 'Cutting-edge AI solutions including machine learning, natural language processing, and AI-powered photo & video generation.', icon: 'Brain' },
    { id: 4, title: 'Enterprise Solutions', description: 'End-to-end ERP, CRM, and POS systems designed for operational excellence and seamless business integration.', icon: 'Building2' },
    { id: 5, title: 'Data Analytics & Intelligence', description: 'Transform raw data into actionable insights with custom dashboards, predictive analytics, and business intelligence tools.', icon: 'BarChart3' },
    { id: 6, title: 'UI/UX & Product Design', description: 'Human-centered design that transforms complex workflows into intuitive, beautiful digital experiences.', icon: 'Palette' },
    { id: 7, title: 'Security & Reliability', description: 'Comprehensive security testing — VAPT, API security, mobile app testing, source code reviews, and network penetration testing.', icon: 'Shield' },
    { id: 8, title: 'Consulting & Growth Strategy', description: 'Strategic technology consulting to align digital transformation with business goals and accelerate growth.', icon: 'TrendingUp' },
    { id: 9, title: 'Maintenance & Long-Term Support', description: 'Annual Maintenance Contracts (AMC) ensuring your systems stay updated, secure, and performing at their best.', icon: 'Wrench' },
  ];
  services.forEach(s => servicesSheet.addRow(s));

  // ── Jobs Sheet ──────────────────────────────────────
  const jobsSheet = workbook.addWorksheet('Jobs');
  jobsSheet.columns = [
    { header: 'id', key: 'id', width: 8 },
    { header: 'title', key: 'title', width: 35 },
    { header: 'location', key: 'location', width: 25 },
    { header: 'type', key: 'type', width: 15 },
    { header: 'department', key: 'department', width: 20 },
    { header: 'description', key: 'description', width: 70 },
  ];

  const jobs = [
    { id: 1, title: 'Senior Full-Stack Developer', location: 'Remote / Canada', type: 'Full-time', department: 'Engineering', description: 'Join our core engineering team to build scalable enterprise solutions using React, Node.js, and cloud technologies.' },
    { id: 2, title: 'AI/ML Engineer', location: 'Remote / India', type: 'Full-time', department: 'AI & Innovation', description: 'Drive AI innovation by developing and deploying machine learning models that solve real-world business problems.' },
    { id: 3, title: 'UI/UX Designer', location: 'Remote / Austria', type: 'Full-time', department: 'Design', description: 'Craft world-class user experiences for enterprise clients, from research and wireframing to high-fidelity prototypes.' },
  ];
  jobs.forEach(j => jobsSheet.addRow(j));

  // ── Users Sheet ─────────────────────────────────────
  const usersSheet = workbook.addWorksheet('Users');
  usersSheet.columns = [
    { header: 'id', key: 'id', width: 8 },
    { header: 'name', key: 'name', width: 25 },
    { header: 'email', key: 'email', width: 35 },
    { header: 'password', key: 'password', width: 65 },
    { header: 'role', key: 'role', width: 12 },
    { header: 'createdAt', key: 'createdAt', width: 25 },
  ];

  const adminPassword = await bcrypt.hash('Admin@123', 10);
  const employeePassword = await bcrypt.hash('Employee@123', 10);

  const users = [
    { id: 1, name: 'Admin User', email: 'admin@techinnosphere.com', password: adminPassword, role: 'admin', createdAt: new Date().toISOString() },
    { id: 2, name: 'Employee User', email: 'employee@techinnosphere.com', password: employeePassword, role: 'employee', createdAt: new Date().toISOString() },
  ];
  users.forEach(u => usersSheet.addRow(u));

  // ── Settings Sheet ──────────────────────────────────
  const settingsSheet = workbook.addWorksheet('Settings');
  settingsSheet.columns = [
    { header: 'id', key: 'id', width: 8 },
    { header: 'key', key: 'key', width: 25 },
    { header: 'value', key: 'value', width: 60 },
  ];

  const settings = [
    { id: 1, key: 'companyName', value: 'TechInnoSphere' },
    { id: 2, key: 'tagline', value: 'From Vision to Software we Build it All' },
    { id: 3, key: 'email', value: 'info@techinnosphere.com' },
    { id: 4, key: 'phone', value: '+1 (800) TECH-INN' },
    { id: 5, key: 'instagram', value: 'https://instagram.com/techinnosphere' },
    { id: 6, key: 'facebook', value: 'https://facebook.com/techinnosphere' },
  ];
  settings.forEach(s => settingsSheet.addRow(s));

  // Style all header rows
  workbook.eachSheet(sheet => {
    const headerRow = sheet.getRow(1);
    headerRow.font = { bold: true, size: 11, color: { argb: 'FFFFFFFF' } };
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF1B3A5C' },
    };
    headerRow.alignment = { vertical: 'middle', horizontal: 'center' };
    headerRow.height = 25;
  });

  // Save file
  await workbook.xlsx.writeFile(DATA_FILE);

  console.log('✅ Database seeded successfully!');
  console.log(`📄 File: ${DATA_FILE}\n`);
  console.log('📋 Sheets created:');
  console.log(`   • Projects  — ${projects.length} records`);
  console.log(`   • Services  — ${services.length} records`);
  console.log(`   • Jobs      — ${jobs.length} records`);
  console.log(`   • Users     — ${users.length} records`);
  console.log(`   • Settings  — ${settings.length} records`);
  console.log('\n🔑 Default Credentials:');
  console.log('   Admin:    admin@techinnosphere.com / Admin@123');
  console.log('   Employee: employee@techinnosphere.com / Employee@123');
}

seed().catch(err => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
