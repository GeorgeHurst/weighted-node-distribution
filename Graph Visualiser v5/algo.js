const PI = Math.PI;



function calculatePositions(nodes, orbitNum, positions={}) {

    let orbitRadius = 200;
    let nodeRadius = graph.nodeSize;
    let sizeX = windowWidth;
    let sizeY = windowHeight;

    

    if (! nodes.length) {
        return positions;
    }

    let currentRadius = orbitRadius * orbitNum;
    let maxNodes = PI * currentRadius / nodeRadius;
    let angleIncrement = (2 * PI) / (nodes.length < maxNodes ? nodes.length : maxNodes);

    let currentAngle = angleIncrement;

    while ( (currentAngle <= 2*PI) && nodes.length) {
        positions[nodes.pop()] = {
            x: round(sizeX/2 + currentRadius*Math.cos(currentAngle), 2),
            y: round(sizeY/2 + currentRadius*Math.sin(currentAngle), 2)
        } 
     

        currentAngle += angleIncrement;
    }

    // temp = orbitNum + 1;
    return calculatePositions(nodes, orbitNum+1, positions);

    
}