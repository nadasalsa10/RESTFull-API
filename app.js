require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('./middlewares/logger');
const { notFound, errorHandler } = require('./middlewares/errorHandler');
const perbaikanRoutes = require('./routes/perbaikanRoutes');
const teknisiRoutes = require('./routes/teknisiRoutes');

const requiredConfig = ['PORT', 'MONGODB_URI', 'CORS_ORIGIN'];
const missingConfig = requiredConfig.filter((name) => !process.env[name]);

if (missingConfig.length > 0) {
  throw new Error(`Konfigurasi .env belum lengkap: ${missingConfig.join(', ')}`);
}

const port = Number(process.env.PORT);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('PORT di .env harus berupa angka antara 1 dan 65535');
}

const app = express();

app.use(logger);
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  methods: ['GET', 'POST'],
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API Servis Laptop berjalan' });
});

app.use('/perbaikan', perbaikanRoutes);
app.use('/teknisi', teknisiRoutes);
app.use(notFound);
app.use(errorHandler);

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    app.listen(port, () => {
      console.log(`Server berjalan di http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Gagal terhubung ke MongoDB:', error.message);
    process.exit(1);
  }
}

startServer();
