class Panel {
  constructor() {
    this.width = 800;
    this.height = windowHeight;
    this.x = windowWidth - this.width;
    this.y = 0;

    this.runAlready = false;

    this.exitButtonX = width - 60;
    this.exitButtonY = 10;
    this.exitButtonSize = 48;
  }

  show() {
    if (!this.runAlready) {
      controls.offsetX =
        windowWidth / 2 - graph.nodes.get(graph.centerNode).x - this.width / 2;
      controls.offsetY = windowHeight / 2 - graph.nodes.get(graph.centerNode).y;
      this.runAlready = true;
    }
    push();
    strokeWeight(4);
    fill(colours.light_grey);
    rect(this.x, this.y, this.width, this.height);
    // fill(0);
    // textAlign(CENTER);
    // textSize(32);
    // text("INFORMATION HERE", this.x + this.width / 2, this.y + this.height / 2);
    pop();

    image(exitButton, this.exitButtonX, this.exitButtonY);

    this.writeText("Title of the node", "title");
    this.writeText("This is the description", "description")
    this.writeText("This is the body. Here the information for the node will sit.", "body")
  }

  writeText(contents, contentType) {
    push();
    let padding = 15;
    let x = this.x + padding;
    let size, y;
    if (contentType == "title") {
      size = 50;
      y = 20;
    } else if (contentType == "description") {
      size = 25;
      y = 80;
    } else if (contentType == "body") {
        size = 20;
        y = 200;
      }
    textSize(size);
    text(contents, x, y, this.width - padding, this.height - padding);
    pop();
  }
}
