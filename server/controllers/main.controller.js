const nodecontroller = require('./node.controller');

class MainController {

  index(req, res) {
    //res.render('index', { title: 'Graph Generator' });

    nodecontroller.getNodes(req, res);
  }

}

module.exports = new MainController();