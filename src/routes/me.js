const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeController')

router.get('/stored/posts', meController.stored);
router.get('/trash/posts', meController.trash);

module.exports = router;