/**
 * Created by esteb on 24/6/2016.
 */


class Graph{

    constructor(nodes, links) {

        this.nodes= nodes;
        this.links= links;
    }

    existCycle(link) {
        var found = false;
        this.links.push(link);
        //while (!found){
        var queue = [];
        queue.push(this.getNodeById(link.begin));

        while (!found && queue.length != 0){
            var node = queue.shift();
            console.log("LISTADO DE LINKS: ", this.links);
            var linksAdy = this.getLinksAdy(node);
            console.log("Contenido del nodo", node);
            console.log("links adyacentes: ", linksAdy);
            var i = 0;
            while (i < linksAdy.length){
                var l=linksAdy[i];
                if (l.mark == true){
                    console.log("FOUND = true");
                    return true;
                }
                else{
                    l.mark = true;
                    console.log("SE MARCA EL ARCO", l);
                    queue.push(this.getNodeById(l.end));
                    console.log("PILA: ", queue);
                }
                i++;
            }
        }
       // }
        console.log("FOUND = false");
        return found;
    }
    
    getLinksAdy(node){
        return this.links.filter(link => link.begin.toString() == node.id.toString());
    }
    
    getNodeById(id){
        return this.nodes.find(node => node.id.toString() == id.toString());
    }
}

module.exports = Graph;