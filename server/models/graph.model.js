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
        while (!found){
            var queue = [];
            queue.push(link.begin);
            while (!found && queue.length){
                var node = queue.shift();
                var linksAdy = this.getLinksAdy(node);
                var i = 0;
                while (i < linksAdy.length){
                    var l=linksAdy[i];
                    if (l.mark == true)
                        return true;
                    else{
                        l.mark = true;
                        queue.push(this.getNodeById(l.end));
                    }
                    i++;
                }
            }
        }
        return found;
    }
    
    getLinksAdy(node){
        return this.links.filter(link => link.begin == node.id);
    }
    
    getNodeById(id){
        return this.nodes.find(node => node.id == id);
    }
}