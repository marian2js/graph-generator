const mongoProvider = require('../providers/graph.mongo.provider');
const fs = require('fs');
var path = require('path');
const uuid = require('uuid');
const TMP_DIR = '../../tmp';

class GraphController {

  export(req,res) {
    var nodesPromise = mongoProvider.getNodes();
    var linksPromise = mongoProvider.getLinks();
    Promise.all([nodesPromise, linksPromise])
      .then(function (data) {
        var obj = {
          nodes: data[0],
          links: data[1]
        };
        var text = JSON.stringify(obj, null, 2);
        var tmpFolder = path.resolve(__dirname, TMP_DIR);
        fs.mkdir(tmpFolder, function () {
          var fileName =  uuid.v1() + ".json";
          fs.appendFile(path.resolve(tmpFolder, fileName), text, function () {
            res.setHeader('Content-Type', 'application/json');
            res.send({file: fileName});
          });
        });
    });
  }

  downloadFile(req, res) {
    var tmpFolder = path.resolve(__dirname, TMP_DIR);
    res.download(path.resolve(tmpFolder, req.query.file));
  }

  import(req, res) {
    //TODO
  }

}

module.exports = new GraphController();
