var scene02 = new Scene();

var dottedBox;

scene02.create = function() {
    createCartesianPlan();
    createCoordText();
    drawDottedBox(false);

    this.tap = false;
    game.input.onTap.add(this.onTap,this);
}

scene02.render = function() {

}

scene02.update = function() {
    
    if (this.tap) {
        this.tap = false;
    }
}

//TODO: mudar numero mágico
function createCoordText(){
    var textX = game.add.text(CANVAS_WIDTH-15, CANVAS_HEIGHT/2, "X", { font: "15px Arial", fill: "#000000", align: "center" });
    var textY = game.add.text(CANVAS_WIDTH/2+5, CANVAS_ORIGIN_Y, "Y", { font: "15px Arial", fill: "#000000", align: "center" });
}

function drawDottedBox(clicked){
    var margin = 30
    if (!clicked){
        graphics.lineStyle(1, 0xFF0000, 1);
    } else {
        graphics.lineStyle(1, 0xFFFF00, 1);
    }
    dottedBox = graphics.drawRect(CANVAS_WIDTH + margin,CANVAS_ORIGIN_Y + margin, 100, CANVAS_HEIGHT/3 - margin);
}

scene02.onTap = function(){
    this.tap = true;
    console.log("Teste");
    drawDottedBox(true);
}