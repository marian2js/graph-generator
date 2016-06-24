const provider = require('../providers/graph.mongo.provider');
const fs = require('fs');

class GraphController {

  importGraph(req, res) {
    let nodes = req.body.nodes;
    let links = req.body.links;
    var promises  = [];
    for(let node of nodes) {
      promises.push(provider.createNode(node, node.id));
    }
    for(let link of links) {
      promises.push(provider.createLink(link, link.id));
    }
    Promise.all(promises)
      .then(function () {
        res.status(200).send();
      })
      .catch(function(err) {
        console.error(err.stack);
        res.status(500).send();
      })
  }

}

module.exports = new GraphController();