const express = require('express');
const { getPerbaikan, createPerbaikan } = require('../controller/perbaikanController');

const router = express.Router();

router.get('/', getPerbaikan);
router.post('/', createPerbaikan);

module.exports = router;
const playerController = require("../controller/playersController");
const cekApiKey = require("../middlewares/cekApiKey");

// GET /api/players
router.get("/", perbaikanController.getPerbaikan);

// GET /api/players/:id
router.get("/:id", perbaikanController.getPerbaikanById);

// POST /api/players
router.post("/", cekApiKey, perbaikanController.createPerbaikan);

// PUT /api/players/:id
router.put("/:id", cekApiKey, perbaikanController.updatePerbaikan);

// DELETE /api/players/:id
router.delete("/:id", cekApiKey, perbaikanController.deletePerbaikan);

module.exports = router;