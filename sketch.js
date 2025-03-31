let boundaryCoordinates;
let nodeCoordinates;
let radius;

// let nodes = [3, 1, 2, 5, 8, 4, 8];
let nodes = [
  [3, 1],
  [1, 0],
  [5, 8],
  [1, 1],
  [3, 2],
];

let boundaries = false;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // boundaryCoordinates = nodeBoundaries(nodes);
  [nodeCoordinates, boundaryCoordinates] = orderNodes(nodes);

  let button = createButton("Toggle Boundaries");
  button.position(10, height - 30);
  button.mousePressed(() => {
    boundaries = !boundaries;
  });
}

function draw() {
  background(0);
  if (boundaries) {
    push();
    noFill();
    stroke("red");
    strokeWeight(5);
    ellipse(width / 2, height / 2, 600);
    ellipse(width / 2, height / 2, 800);
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
        text(
          `${index}:   ${nodes[index]} nodes`,
          width - 150,
          100 + index * 50
        );
      }
      pop();
    } else {
      push();
      stroke(180);
      strokeWeight(3);
      line(width / 2, height / 2, node[0], node[1]);
      pop();
      push();
      noFill();
      strokeWeight(3);
      stroke(180, 10);
      ellipse(width / 2, height / 2, 600);
      pop();
    }
    ellipse(node[0], node[1], 40);
    textSize(18);
    textAlign(CENTER);
    text(index, node[0], node[1] + 5);
  });
}
