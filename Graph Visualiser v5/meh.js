let nodesMap = new Map(); // Fast lookup by name
let nodesList = [];       // Maintain order for rendering
let edges = [];           // Stores connections

class Node {
  constructor(name, x, y) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.connections = new Set(); // Stores connected node names
  }
}

// Add a new node
function addNode(name, x, y) {
  if (!nodesMap.has(name)) {
    let node = new Node(name, x, y);
    nodesMap.set(name, node);
    nodesList.push(node);
  }
}

// Connect two nodes by name
function addEdge(nodeAName, nodeBName) {
  let nodeA = nodesMap.get(nodeAName);
  let nodeB = nodesMap.get(nodeBName);

  if (nodeA && nodeB && nodeA !== nodeB) {
    nodeA.connections.add(nodeBName);
    nodeB.connections.add(nodeAName);
    edges.push([nodeA, nodeB]);
  }
}

function setup() {
  createCanvas(600, 600);

  // Example nodes
  addNode("A", random(100, 500), random(100, 500));
  addNode("B", random(100, 500), random(100, 500));
  addNode("C", random(100, 500), random(100, 500));

  // Example connections
  addEdge("A", "B");
  addEdge("B", "C");
  addEdge("A", "C");
}

function draw() {
  background(30);

  // Draw edges (connections)
  stroke(255);
  strokeWeight(2);
  for (let [nodeA, nodeB] of edges) {
    line(nodeA.x, nodeA.y, nodeB.x, nodeB.y);
  }

  // Draw nodes
  fill(0, 150, 255);
  noStroke();
  for (let node of nodesList) {
    ellipse(node.x, node.y, 20, 20); // Draw node
    fill(255);
    textAlign(CENTER, CENTER);
    text(node.name, node.x, node.y - 15); // Label
    fill(0, 150, 255);
  }
}
