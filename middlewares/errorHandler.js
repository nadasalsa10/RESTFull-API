function notFound(req, res) {
  res.status(404).json({
    status: "error",
    message: "Endpoint tidak ditemukan",
    data: null
  });
}

function errorHandler(err, req, res, next) {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({
      status: "error",
      message: "Format JSON tidak valid",
      data: null
    });
  }

  if (err.code === 11000) {
    return res.status(409).json({
      status: 'error',
      message: 'Nilai unik sudah digunakan',
      data: null,
    });
  }

  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return res.status(400).json({
      status: 'error',
      message: err.message,
      data: null,
    });
  }

  const status = err.status || 500;

  if (status === 500) {
    console.error(err.stack);

    return res.status(500).json({
      status: "error",
      message: "Terjadi kesalahan pada server",
      data: null
    });
  }

  res.status(status).json({
    status: "error",
    message: err.message,
    data: null
  });
}

module.exports = {
  notFound,
  errorHandler
};