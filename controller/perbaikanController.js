const Perbaikan = require('../models/perbaikanModel');
const Teknisi = require('../models/teknisiModel');

async function getPerbaikan(req, res, next) {
  try {
    const filter = {};
    if (typeof req.query.status === 'string' && req.query.status.trim()) {
      filter.status = req.query.status.trim();
    }

    const data = await Perbaikan.find(filter)
      .populate('teknisiId', 'kode nama')
      .sort({ createdAt: -1 });

    res.status(200).json({ status: 'success', data });
  } catch (error) {
    next(error);
  }
}

async function createPerbaikan(req, res, next) {
  try {
    const teknisi = await Teknisi.findById(req.body.teknisiId);
    if (!teknisi) {
      const error = new Error('Teknisi tidak ditemukan');
      error.status = 400;
      return next(error);
    }

    const perbaikan = await Perbaikan.create(req.body);
    await perbaikan.populate('teknisiId', 'kode nama');

    res.status(201).json({
      status: 'success',
      message: 'Data perbaikan berhasil ditambahkan',
      data: perbaikan,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { getPerbaikan, createPerbaikan };