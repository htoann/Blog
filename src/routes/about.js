const express = require('express');
const router = express.Router();

const aboutController = require('../app/controllers/AboutController')

// router.use('/search', aboutController.search);
router.get('/', aboutController.index);

module.exports = router;