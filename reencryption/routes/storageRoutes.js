const express = require('express');
const { addItem, getItem, listItems } = require('../controllers/storageController');

const router = express.Router();

router.post('/add', addItem);
router.get('/get/:cid', getItem);
router.get('/list/:cid', listItems);

module.exports = router;