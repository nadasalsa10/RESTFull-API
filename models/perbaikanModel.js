const mongoose = require('mongoose');

const perbaikanSchema = new mongoose.Schema({
  noTiket: {
    type: String,
    required: [true, 'noTiket wajib diisi'],
    unique: true,
    trim: true,
  },
  namaPelanggan: {
    type: String,
    required: [true, 'namaPelanggan wajib diisi'],
    trim: true,
  },
  estimasiBiaya: {
    type: Number,
    required: [true, 'estimasiBiaya wajib diisi'],
    min: [0, 'estimasiBiaya minimal 0'],
  },
  status: {
    type: String,
    required: [true, 'status wajib diisi'],
    trim: true,
  },
  perangkat: {
    merek: {
      type: String,
      required: [true, 'merek perangkat wajib diisi'],
      trim: true,
    },
    model: {
      type: String,
      required: [true, 'model perangkat wajib diisi'],
      trim: true,
    },
  },
  teknisiId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teknisi',
    required: [true, 'teknisiId wajib diisi'],
  },
}, {
    createdAt: { type: Date, default: Date.now },
    versionKey: false,
});

module.exports = mongoose.model('Perbaikan', perbaikanSchema);
