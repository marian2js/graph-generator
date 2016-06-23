const provider = require('../providers/graph.mongo.provider')

class NodeController {

  getNodes(req, res) {
    // TODO
  }

  getNode(req, res) {
    // TODO
  }

  createNode(req, res) {
    // TODO
  }

  updateNode(req, res) {
    // TODO
  }

  deleteNode(req, res) {
    var id = req.get('IdNode');
    provider.deleteNode(id)
        .then(function () {
          res.statusCode(200).send();
        }).catch(function (err) {
          res.statusCode(500).send({ error: err })
        });
  }

}

module.exports = new NodeController();