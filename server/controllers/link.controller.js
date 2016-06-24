/**
 * Created by Timoteo on 22/06/2016.
 */
const provider = require('../providers/graph.mongo.provider');
const Link = require('../models/link.model');

class LinkController {

    getLinks(req, res) {
        provider.getLinks()
                .then(function (links) {
                    res.send(links);
                }).catch(function (err) {
                res.statusCode(500).send({ error: err })
                });
    }


    getLink(req, res) {
        provider.getLink(req.params.id)
            .then(function (link) {
                res.send(link);
            }).catch(function (err) {
                res.statusCode(500).send({error: err})
            });

    }

    createLink(req, res) {
        var link = new Link(req.body.begin, req.body.end);
        var data = req.body.data || {};
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                link.data[key] = data[key];
            }
        }
        provider.createLink(link)
            .then(function() {
                res.status(203).send();
            }).catch(function(err) {
                console.error(err.stack);
                res.status(500).send('Link creation unsuccessful');
            });
    }

    updateLink(req, res) {
        var link = new Link(req.body.begin, req.body.end);
        var data = req.body.data || {};
        link.id = req.params.id;
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                link.data[key] = data[key];
            }
        }
        provider.updateLink(link)
            .then(function() {
                res.status(203).send();
            }).catch(function(err) {
                console.error(err.stack);
                res.status(500).send({ error: err });
            });
    }

    deleteLink(req, res) {
        var id = req.params.id;
        provider.deleteLink(id)
            .then(function () {
                res.status(204).send();
            }).catch(function (err) {
                console.error(err.stack);
                res.status(500).send({ error: err })
            });
    }

}

module.exports = new LinkController();