const express = require('express');
const IpfsController = require('../controllers/decentralizeController');

const router = express.Router();

router.post('/add', IpfsController.addFile);
router.get('/file/:cid', IpfsController.getFile);
router.put('/file/:cid', IpfsController.updateFile);
router.delete('/file/:cid', IpfsController.deleteFile);

module.exports = router;