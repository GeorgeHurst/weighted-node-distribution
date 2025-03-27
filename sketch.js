let boundaryCoordinates;
let nodeCoordinates;
let radius;

let nodes = [3, 1, 2, 5, 8, 4, 8];

let boundaries = true;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // boundaryCoordinates = nodeBoundaries(nodes);
  [nodeCoordinates, boundaryCoordinates] = orderNodes(nodes);

  let button = createButton("Toggle Boundaries");
  button.position(10, height - 30);
  button.mousePressed(toggleBoundaries);
}

function draw() {
  background(0);
  if (boundaries) {
    push();
    noFill();
    stroke("red");
    strokeWeight(5);
    ellipse(width / 2, height / 2, 600);
    pop();
  }
  push();
  noStroke();
  ellipse(width / 2, height / 2, 90);
  pop();

  if (boundaries) {
    boundaryCoordinates.forEach((boundary) => {
      push();
      stroke("green");
      strokeWeight(5);
      line(width / 2, height / 2, boundary[0], boundary[1]);
      pop();
    });
  }
  nodeCoordinates.forEach((node, index) => {
    if (boundaries) {
      push();
      fill(255);
      textAlign(LEFT);
      if (nodes[index] != undefined) {
        text(`${index}:   ${nodes[index]}`, width - 150, 100 + index * 50);
      }
      pop();
    } else {
      push()
      stroke(180);
      strokeWeight(3)
      line(width / 2, height / 2, node[0], node[1])
      pop();
    }
    ellipse(node[0], node[1], 40);
    textSize(18);
    textAlign(CENTER);
    text(index, node[0], node[1] + 5);
  });
}

function toggleBoundaries() {
  boundaries = !boundaries;
}
