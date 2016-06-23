const mongodb = require('mongodb');
const GraphProvider = require('./graph.provider');
const mongoStorage = require('../storage/mongo.storage');
const Node = require('../models/node.model');

class GraphMongoProvider extends GraphProvider {
  getNodes() {
    return new Promise((resolve, reject) => {
      mongoStorage.db.nodes.find({})
        .toArray((err, nodes) => {
          if (err) {
            return reject(err);
          }
          nodes = nodes.map(nodeObj => {
            let node = new Node(nodeObj.name);
            node.id = nodeObj._id;
            for (let key in nodeObj.data) {
              if (nodeObj.data.hasOwnProperty(key)) {
                node.data[key] = nodeObj.data[key];
              }
            }
            return node;
          });
          resolve(nodes);
        });
    });
  }

  getNode(id) {
    var objectId = new mongodb.ObjectID(id);
    return mongoStorage.db.nodes
      .findOne({_id: objectId})
      .then(nodeObj => {
        let node = new Node(nodeObj.name);
        node.id = nodeObj._id;
        for (let key in nodeObj.data) {
          if (nodeObj.data.hasOwnProperty(key)) {
            node.data[key] = nodeObj.data[key];
          }
        }
        return node;
      });
  }

  createNode(node) {
    var obj = {
      name: node.name,
      data: node.data
    };
    return mongoStorage.db.nodes.insert(obj);
  }

  updateNode(node) {
    var nodeId = new mongodb.ObjectID(node.id);
    var obj = {
      name: node.name,
      data: node.data
    };
    return mongoStorage.db.nodes.update({_id: nodeId}, obj);
  }

  deleteNode(id) {
    return mongoStorage.db.nodes.delete({_id: id});
  }

  getLinks() {
    return mongoStorage.db.links.find({});
  }

  getLink(id) {
    return mongoStorage.db.links.find({_id: id});
  }

  createLink(link) {
    var obj = {
      data: link.data
    };
    return mongoStorage.db.links.insert(obj);
  }

  updateLink(link) {
    var obj = {
      data: node.data
    };
    return mongoStorage.db.links.update({_id: link.id}, obj);
  }

  deleteLink(id) {
    return mongoStorage.db.link.delete({_id: id});
  }
}

module.exports = new GraphMongoProvider();
