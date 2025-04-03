let center;
let graph, requester, informationPanel;
let prevCenterNode;
let panelOpen = false;

let testButton;

let controls = {
  offsetX: 0,
  offsetY: 0,
  prevX: null,
  prevY: null,
  isDragging: false,
};

let backButtonAttributes = {
  x: 25,
  y: 5,
};

function preload() {
  backButton = loadImage("assets/back_arrow.png");
  exitButton = loadImage("assets/exit_button.png");
}

async function setup() {
  createCanvas(windowWidth, windowHeight);

  center = createVector(windowWidth / 2, windowHeight / 2);

  graph = new Graph();
  requester = new Requester();
  informationPanel = new Panel();

  // let related_nodes = await requester.getRelatedNodes(graph.centerNode, config.searchDepth);
  let related_nodes = {
    12: {
      node_name: "Test Case 4",
      x: 201,
      y: 234,
      children_nodes: {
        28: "14",
        37: "14",
        46: "14",
        55: "14",
        64: "14",
        73: "14",
        82: "14",
        91: "14",
        100: "14",
        109: "14",
        118: "14",
        127: "14",
        135: "14",
        144: "14",
        153: "14",
      },
    },
    28: {
      node_name: "ISCO",
      x: -367,
      y: -390,
      children_nodes: {},
    },
    37: {
      node_name: "INVA",
      x: -49,
      y: -369,
      children_nodes: {},
    },
    46: {
      node_name: "PEDP",
      x: -189,
      y: -260,
      children_nodes: {},
    },
    55: {
      node_name: "TECH",
      x: 331,
      y: -172,
      children_nodes: {},
    },
    64: {
      node_name: "REQM",
      x: -154,
      y: -211,
      children_nodes: {},
    },
    73: {
      node_name: "PROD",
      x: -89,
      y: 294,
      children_nodes: {},
    },
    82: {
      node_name: "SINT",
      x: -325,
      y: 330,
      children_nodes: {},
    },
    91: {
      node_name: "ADEV",
      x: 114,
      y: -21,
      children_nodes: {},
    },
    100: {
      node_name: "VISL",
      x: 346,
      y: -384,
      children_nodes: {},
    },
    109: {
      node_name: "KNOW",
      x: -63,
      y: -316,
      children_nodes: {},
    },
    118: {
      node_name: "NTAS",
      x: 220,
      y: -53,
      children_nodes: {},
    },
    127: {
      node_name: "AVMT",
      x: -357,
      y: -366,
      children_nodes: {},
    },
    135: {
      node_name: "IAMT",
      x: 360,
      y: -235,
      children_nodes: {},
    },
    144: {
      node_name: "DBAD",
      x: 308,
      y: 198,
      children_nodes: {},
    },
    153: {
      node_name: "ETDL",
      x: -176,
      y: -349,
      children_nodes: {},
    },
  };
  console.log("Response from HTTP request: ", related_nodes);
  graph.importNodes(related_nodes);
  graph.positionNodesForRadialView();

  controls.offsetX = windowWidth / 2 - graph.nodes.get(graph.centerNode).x;
  controls.offsetY = windowHeight / 2 - graph.nodes.get(graph.centerNode).y;

  prevCenterNode = graph.centerNode;



  testButton = createButton("Open Information Panel")
  testButton.position(50,height-50)
  testButton.mousePressed(() => {panelOpen = true})



  // graph.generateNodeCoordinates(graph.nodes.size)
}

function draw() {
  background(theme.backgroundColour);

  push();
  translate(controls.offsetX, controls.offsetY);

  requestRelativeNodes();
  graph.update();

  prevCenterNode = graph.centerNode;

  pop();

  image(backButton, backButtonAttributes.x, backButtonAttributes.y);

  if (panelOpen) {informationPanel.show()} else {
    if (informationPanel.runAlready) {
      controls.offsetX = windowWidth / 2 - graph.nodes.get(graph.centerNode).x;
      controls.offsetY = windowHeight / 2 - graph.nodes.get(graph.centerNode).y;
    }
    informationPanel.runAlready = false;
  }
  
}

async function requestRelativeNodes() {
  if (prevCenterNode != graph.centerNode) {
    graph.nodes.clear();
    let related_nodes = await requester.getRelatedNodes(
      graph.centerNode,
      config.searchDepth
    );
    // console.log("Response from HTTP request: ",related_nodes)
    await graph.importNodes(related_nodes);
    await graph.positionNodesForRadialView();

    controls.offsetX = windowWidth / 2 - graph.nodes.get(graph.centerNode).x;
    controls.offsetY = windowHeight / 2 - graph.nodes.get(graph.centerNode).y;
  }
}

// Function to dynamically resize the canvas dimensions when it is resized.
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  controls.offsetX = windowWidth / 2 - graph.nodes.get(graph.centerNode).x;
  controls.offsetY = windowHeight / 2 - graph.nodes.get(graph.centerNode).y;
}

// Reset view when space is pressed
function keyPressed() {
  if (keyCode === 32) {
    if (panelOpen) {
      controls.offsetX = windowWidth / 2 - graph.nodes.get(graph.centerNode).x - informationPanel.width/2;
    } else {
      controls.offsetX = windowWidth / 2 - graph.nodes.get(graph.centerNode).x;
    }
    controls.offsetY = windowHeight / 2 - graph.nodes.get(graph.centerNode).y;
  }
}

//############################################################################################################################################
// Code for Panning Functionality

// Handle mouse press for panning
function mousePressed() {
  if (panelOpen === false) {
    controls.isDragging = true;
    controls.prevX = mouseX;
    controls.prevY = mouseY;
  } else{
    if (mouseX < informationPanel.x) {
      controls.isDragging = true;
      controls.prevX = mouseX;
      controls.prevY = mouseY;
    }
  }

  if (mouseX > informationPanel.exitButtonX && mouseX < informationPanel.exitButtonX+informationPanel.exitButtonSize && mouseY > informationPanel.exitButtonY && mouseY < informationPanel.exitButtonY+informationPanel.exitButtonSize) {
    panelOpen = false;
  }

  // if (mouseX > backButtonAttributes.x && mouseX < 64 && mouseY > backButtonAttributes.y && mouseY < 64) {
  //   requestRelativeNodes()
  // }

  // for (var [_,node] of graph.nodes) {

  //   if (node.highlighted) {

  //     controls.offsetX = windowWidth / 2 - node.x;
  //     controls.offsetY = windowHeight / 2 - node.y;
  //     graph.centerNode = node.id;
  //   }
  // }
}

// Handle mouse drag for panning
function mouseDragged() {
  if (!controls.isDragging) return;

  let dx = mouseX - controls.prevX;
  let dy = mouseY - controls.prevY;

  controls.offsetX += dx;
  controls.offsetY += dy;

  controls.prevX = mouseX;
  controls.prevY = mouseY;
}

// Handle mouse release
function mouseReleased() {
  controls.isDragging = false;
}
