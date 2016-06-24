const express = require('express');
const router = express.Router();
const nodeController = require('../controllers/node.controller');
const linkController = require('../controllers/link.controller');
const graphController = require('../controllers/graph.controller');

router.get('/nodes', nodeController.getNodes);
router.get('/nodes/:id', nodeController.getNode);
router.post('/nodes', nodeController.createNode);
router.put('/nodes/:id', nodeController.updateNode);
router.delete('/nodes/:id', nodeController.deleteNode);

router.get('/links', linkController.getLinks);
router.get('/links/:id', linkController.getLink);
router.post('/links', linkController.createLink);
router.put('/links/:id', linkController.updateLink);
router.delete('/links/:id', linkController.deleteLink);

router.post('/import', graphController.importGraph);

module.exports = router;
