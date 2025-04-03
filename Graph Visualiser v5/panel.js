class Panel {

    constructor() {
        this.width = 800;
        this.height = windowHeight;
        this.x = windowWidth - this.width;
        this.y = 0;

        this.runAlready = false;

        this.exitButtonX = width-60;
        this.exitButtonY = 10;
        this.exitButtonSize = 48;
        
    }

    show() {

        if (!this.runAlready) {
            controls.offsetX = windowWidth / 2 - graph.nodes.get(graph.centerNode).x - this.width/2;
            controls.offsetY = windowHeight / 2 - graph.nodes.get(graph.centerNode).y;
            this.runAlready = true;
        }
        push()
        strokeWeight(4)
        fill(colours.light_grey)
        rect(this.x, this.y, this.width, this.height)
        fill(0);
        textAlign(CENTER)
        textSize(32)
        text("INFORMATION HERE", this.x + this.width/2, this.y+ this.height/2)
        pop()

        image(exitButton, this.exitButtonX,this.exitButtonY)
    }
}