/**
 * @abstract
 */
class GraphProvider {
    getNodes() {}

    getNode(id) {}

    createNode(node) {}

    updateNode(node) {}

    deleteNode(node) {}

    getLinks() {}

    getLink(id) {}

    createLink(link) {}

    updateLink(link) {}

    deleteLink(link) {}
}

module.exports = GraphProvider;

