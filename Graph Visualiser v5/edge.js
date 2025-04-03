class Edge {
  constructor(id, headNodeId, tailNodeId) {
    this.id = id;
    this.edgeTypeId;
    this.headNodeId = headNodeId;
    this.tailNodeId = tailNodeId;

    this.visible = true;
  }

  construct() {
    let headNode = graph.nodes.get(this.headNodeId);
    let tailNode = graph.nodes.get(this.tailNodeId);

    push();
    strokeWeight(3);
    stroke(theme.edgeColour);
    if (
      this.visible &&
      this.headNodeId != undefined &&
      this.tailNodeId != undefined
    ) {
      line(headNode.x, headNode.y, tailNode.x, tailNode.y);
    }
    pop();
  }
}
