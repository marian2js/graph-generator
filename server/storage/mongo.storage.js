const mongodb = require('mongodb');
const AbstractProvider = require('./abstract.storage');
const MONGODB_URL = 'mongodb://localhost/graph-generator';
const COLLECTION_NODES = 'nodes';
const COLLECTION_LINKS = 'links';

class MongoStorage extends AbstractProvider {
    connect() {
        this._collections = {};
        return mongodb.connect(MONGODB_URL)
            .then(db => {
                this._mongoConnection = db;
                return this._mongoConnection.createCollection(COLLECTION_NODES);
            })
            .then(nodeCollection => {
                this._collections.nodes = nodeCollection;
                return this._mongoConnection.createCollection(COLLECTION_LINKS);
            })
            .then(linkCollection => this._collections.links = linkCollection);
    }
    
    get db() {
        return this._collections;
    }
}

module.exports = new MongoStorage();