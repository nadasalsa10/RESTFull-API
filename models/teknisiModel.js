const mongoose = require('mongoose');

const teknisiSchema = new mongoose.Schema({
  kode: {
    type: String,
    required: [true, 'kode wajib diisi'],
    unique: true,
    trim: true,
  },
  nama: {
    type: String,
    required: [true, 'nama wajib diisi'],
    trim: true,
  },
}, {
  versionKey: false,
});

module.exports = mongoose.model('Teknisi', teknisiSchema);
