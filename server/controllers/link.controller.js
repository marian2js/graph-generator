/**
 * Created by Timoteo on 22/06/2016.
 */


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
        // TODO
    }

    updateLink(req, res) {
        // TODO
    }

    deleteLink(req, res) {
        // TODO
    }

}