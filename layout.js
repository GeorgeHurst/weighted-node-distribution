function orderNodes(nodeArray) {
  let nodePositions = [];
  let boundaryPositions = [];
  let currentNodePair = [];
  let currentBoundPair = [];
  let center = {
    x: width / 2,
    y: height / 2,
  };
  let angle = 0;
  let ratios = calculateRatios(nodeArray);
  let orbitRadius = 300;
  let angleList = [0];

  nodeArray.forEach((_, index) => {
    currentBoundPair = [];
    let newAngle = 2 * Math.PI * ratios[index];
    angle += newAngle;
    angleList.push(angle);

    currentBoundPair.push(
      center.x + cos(angle) * (orbitRadius + 50),
      center.y + sin(angle) * (orbitRadius + 50)
    );

    boundaryPositions.push(currentBoundPair);
  });

  for (let i = 0; i < angleList.length; i++) {
    currentNodePair = [];

    let midpoint = angleList[i] + (angleList[i + 1] - angleList[i]) / 2;

    currentNodePair.push(
      center.x + cos(midpoint) * orbitRadius,
      center.y + sin(midpoint) * orbitRadius
    );

    nodePositions.push(currentNodePair);
  }
  return [nodePositions, boundaryPositions];
}

function calculateRatios(nodeArray) {
  let totalWeight = nodeArray.reduce((a, b) => a + b, 0); // Sum of all weights
  let ratios = [];

  for (let n = 0; n < nodeArray.length; n++) {
    ratios.push(nodeArray[n] / totalWeight);
  }

  return ratios;
}
