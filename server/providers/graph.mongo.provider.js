const GraphProvider = require('./graph.provider');
const mongoStorage = require('../storage/mongo.storage');

class GraphMongoProvider extends GraphProvider {
    getNodes() {
        return mongoStorage.db.nodes.find({});
    }

    getNode(id) {
        return mongoStorage.db.nodes.find({_id: id});
    }

    createNode(node) {
        var obj = {
            data: node.data
        };
        return mongoStorage.db.nodes.insert(obj);
    }

    updateNode(node) {
        var obj = {
            data: node.data
        };
        return mongoStorage.db.nodes.update({_id: node.id}, obj);
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
