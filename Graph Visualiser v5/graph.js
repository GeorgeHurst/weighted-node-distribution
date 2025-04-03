class Graph {
  constructor() {
    this.nodes = new Map();
    this.edges = new Map();
    this.centerNode = "12";

    this.nodeRadius = 30;
  }

  createNode(id, x, y, name, children) {
    this.nodes.set(id, new Node(id, x, y, name, children));
  }

  createEdge(id, head, tail) {
    this.edges.set(id, new Edge(id, head, tail));
  }

  clearNodes() {
    this.nodes.clear();
  }

  getChildrenIds(parentnode) {
    let childNodeIds = Object.keys(parentnode.children_nodes);
    let children = [];

    childNodeIds.forEach((child) => {
      children.push(child);
    });
    return children;
  }

  importNodes(importedNodes) {
    let nodeIds = Object.keys(importedNodes);

    for (let i = 0; i < nodeIds.length; i++) {
      let childrenArray = this.getChildrenIds(importedNodes[nodeIds[i]]);

      this.createNode(
        nodeIds[i],
        0,
        0,
        importedNodes[nodeIds[i]].node_name,
        childrenArray
      );
    }
  }

  makeEdges() {

    this.edges.clear();


    this.nodes.get(this.centerNode).children.forEach((childid) => {
    
    if (this.nodes.has(childid)) {
      this.createEdge(
        this.edges.size + 1,
        this.nodes.get(this.centerNode).id,
        childid
      );

      this.nodes.get(childid).visible = true;
    } else {
      console.warn("There's no child available for this node! Try increasing the search depth.");
    }
  });
  }

  renderNodes() {
    this.nodes.forEach((node) => {
      if (node.id === this.centerNode) {
          node.center = true;
        } else {
          node.center = false;
          }
        node.construct()
        node.detectHighlighting()
    });
  }
  
  renderEdges() {
    this.edges.forEach((edge) => {
        edge.construct()
        
    });
  }


  update() {
    setTimeout(this.makeEdges(), 4000);
    setTimeout(this.renderEdges(), 4000);
    setTimeout(this.renderNodes(), 4000);
  }

  positionNodesForRadialView() {
    let numberOfNodes = this.nodes.size - 1;
    let orbitRadius = 10;
    let nodeRadius = this.nodeRadius;
    let minDistance = nodeRadius * 3;
    let maxNodesPerOrbit = floor((2 * Math.PI * orbitRadius) / minDistance);


    if (numberOfNodes > maxNodesPerOrbit) {
      while(numberOfNodes > maxNodesPerOrbit) {
        orbitRadius += minDistance;
        maxNodesPerOrbit = floor((2 * Math.PI * orbitRadius) / minDistance);
      }
    }

    let count = 0;
    this.nodes.forEach((node, index) => {
      
      let angle = (2 * Math.PI * count) / numberOfNodes;
      if (node.id !== this.centerNode) {
        node.x = width / 2 + cos(angle) * orbitRadius;
        node.y = height / 2 + sin(angle) * orbitRadius;
      } else {
        node.x = width / 2;
        node.y = height / 2;
      }

      count++;
    })
  
  }
}
