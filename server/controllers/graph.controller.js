const mongoProvider = require('../providers/graph.mongo.provider');
const fs = require('fs');
const uuid = require('uuid');
const TMP_DIR = '../../tmp';

class GraphController{

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
        fs.mkdir(TMP_DIR, function () {
          var fileName =  uuid.v1()+".json"
          fs.appendFile(TMP_DIR+"/"+ fileName, text, function () {
            res.download(TMP_DIR+"/"+ fileName)
          })

        })

      })

  }

  import(req, res) {
    //TODO
  }

}

module.exports = new GraphController();
