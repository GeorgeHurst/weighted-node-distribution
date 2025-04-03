class Node {
  constructor(id, x, y, name, children) {
    this.id = id; // int
    this.name = name; // str
    this.graphId; // int
    this.nodetypeId; // int
    this.classification; // int
    this.copyrightOwner; // str
    this.version; // str
    this.payload = {}; // json

    this.x = x; // float
    this.y = y; // float

    this.children = children;
    this.parents = [];
    this.center = false;

    this.highlighted = false;
    this.visible = true;
    this.colour;
    this.size;
  }

  construct() {
    this.size = this.center ? 90 : graph.nodeRadius*2;
    push();
    noStroke();
    textAlign(CENTER);
    textSize(16);
    this.highlighted
      ? (this.colour = theme.highlightedNodeColour)
      : (this.colour = theme.baseNodeColour);
    if (this.center) {
      this.colour = theme.centeredNodeColour;
    }
    fill(this.colour);
    if (this.visible) {
      ellipse(this.x, this.y, this.size);
    }
    fill(this.highlighted && !this.center ? 255 : 0);

    if (this.visible && this.highlighted && !center) {
      textSize(14);
      text(`ID: ${this.id}\n${this.name}`, this.x, this.y - 5);
    } else if (this.visible) {
      text(this.name, this.x, this.y + 5);
    }

    // VV for dev
    // if (this.visible && this.highlighted && !this.center) {text(this.id, this.x, this.y+5)} else if (this.visible) {text(this.id, this.x, this.y+5)}
    pop();
  }

  detectHighlighting() {
    let relativeMouseX = mouseX - controls.offsetX;
    let relativeMouseY = mouseY - controls.offsetY;

    if (
      relativeMouseX > this.x - this.size / 2 &&
      relativeMouseX < this.x + this.size / 2 &&
      relativeMouseY > this.y - this.size / 2 &&
      relativeMouseY < this.y + this.size / 2 &&
      this.visible
    ) {
      this.highlighted = true;
    } else {
      this.highlighted = false;
    }
  }

}
