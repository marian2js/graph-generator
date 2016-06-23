const MongoProvider = require('../providers/graph.mongo.provider');
const Node = require('../models/node.model');

class NodeController {

  getNodes(req, res) {
    MongoProvider.getNodes()
        .then(function(nodes) {
          res.status(200).send(nodes);
        }).catch(function(err) {
          console.error(err.stack);
          res.status(400).send('No nodes');
        });
  }

  getNode(req, res) {
    MongoProvider.getNode(req.params.id)
        .then(function(node) {
          res.status(200).send(node);
        }).catch(function(err) {
          console.error(err.stack);
          res.status(400).send('The node does not exist');
        });
  }

  createNode(req, res) {
    var node = new Node(req.body.name);
    var data = req.body.data || {};
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        node.data[key] = data[key];
      }
    }
    MongoProvider.createNode(node)
        .then(function() {
          res.status(203).send();
        }).catch(function(err) {
          console.error(err.stack);
          res.status(500).send('Node creation unsuccessful');
        });
  }

  updateNode(req, res) {
    // TODO
  }

  deleteNode(req, res) {
    var id = req.get('IdNode');
    MongoProvider.deleteNode(id)
        .then(function () {
          res.statusCode(200).send();
        }).catch(function (err) {
          res.statusCode(500).send({ error: err })
        });
  }

}

module.exports = new NodeController();