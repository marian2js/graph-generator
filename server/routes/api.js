const express = require('express');
const router = express.Router();
const nodeController = require('../controllers/node.controller');

router.get('/nodes', nodeController.getNodes);
router.get('/nodes/:id', nodeController.getNode);
router.post('/nodes', nodeController.createNode);
router.put('/nodes/:id', nodeController.updateNode);
router.delete('/nodes/:id', nodeController.deleteNode);

module.exports = router;
