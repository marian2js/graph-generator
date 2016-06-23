class MainController {

  index(req, res) {
    res.render('index', { title: 'Graph Generator' });
  }

}

module.exports = new MainController();