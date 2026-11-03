const express = require('express');
const Teknisi = require('../models/teknisiModel');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const data = await Teknisi.find().sort({ kode: 1 });
    res.status(200).json({ status: 'success', data });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const teknisi = await Teknisi.create({
      kode: req.body.kode,
      nama: req.body.nama,
    });
    res.status(201).json({
      status: 'success',
      message: 'Data teknisi berhasil ditambahkan',
      data: teknisi,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
