const mongodb = require('mongodb');
const GraphProvider = require('./graph.provider');
const mongoStorage = require('../storage/mongo.storage');
const Node = require('../models/node.model');
const Link = require('../models/link.model');

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
    var nodeId = new mongodb.ObjectID(id)
    return mongoStorage.db.nodes.remove({_id: nodeId})
      .then(function () {
        return mongoStorage.db.links.remove({
          $or: [{begin: nodeId}, {end: nodeId}]
        })
      })
  }

  getLinks() {
    return new Promise((resolve, reject) => {
      mongoStorage.db.links.find({})
        .toArray((err, links) => {
          if (err) {
            return reject(err);
          }
          links = links.map(linkObj => {
            let link = new Link(linkObj.begin, linkObj.end);
            link.id = linkObj._id;
            for (let key in linkObj.data) {
              if (linkObj.data.hasOwnProperty(key)) {
                link.data[key] = linkObj.data[key];
              }
            }
            return link;
          });
          resolve(links);
        });
    });
  }

  getLink(id) {
    var objectId = new mongodb.ObjectID(id);
    return mongoStorage.db.links
      .findOne({_id: objectId})
      .then(linkObj => {
        let link = new Link(linkObj.begin, linkObj.end);
        link.id = linkObj._id;
        for (let key in linkObj.data) {
          if (linkObj.data.hasOwnProperty(key)) {
            link.data[key] = linkObj.data[key];
          }
        }
        return link;
      });
  }

  createLink(link) {
    var obj = {
      begin: new mongodb.ObjectID(link.begin),
      end: new mongodb.ObjectID(link.end),
      data: link.data
    };
    return mongoStorage.db.links.insert(obj);
  }

  updateLink(link) {
    var linkId = new mongodb.ObjectID(link.id)
    var obj = {
      begin: link.begin,
      end: link.end,
      data: link.data
    };
    return mongoStorage.db.links.update({_id: linkId}, obj);
  }

  deleteLink(id) {
    var linkId = new mongodb.ObjectID(id)
    return mongoStorage.db.link.delete({_id: linkId});
  }
}

module.exports = new GraphMongoProvider();
