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
      center.x + cos(angle) * (orbitRadius + 150),
      center.y + sin(angle) * (orbitRadius + 150)
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
  // let totalWeight = nodeArray.reduce((a, b) => a + b, 0); // Sum of all weights
  let totalWeight = nodeArray.reduce(
    (a, b) => a + b.reduce((x, y) => x + y, 0),
    0
  );
  let oneDimensionalArray = nodeArray.map((subArray) =>
    subArray.reduce((a, b) => a + b, 0)
  );
  let ratios = [];

  for (let n = 0; n < oneDimensionalArray.length; n++) {
    ratios.push(oneDimensionalArray[n] / totalWeight);
    console.log(oneDimensionalArray[n] / totalWeight);
  }

  console.log(ratios);
  return ratios;
}
