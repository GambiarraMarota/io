var scene02 = new Scene();

var textX;
var textY;
var dottedBox;
var clicked;

scene02.create = function() {
    this.firstPass = true;
    clicked = false;
    scene01.finished = true;
    this.tap = false;
    game.input.onTap.add(this.onTap,this);
}

scene02.render = function() {
    graphics.clear();
    this.createCoordText();
    createInnerCanvas();
    createCartesianPlan();
    this.drawDottedBox(clicked);
}

scene02.update = function() {
    if (this.tap) {
        this.tap = false;
    }
    console.log("teste");
}

//TODO: mudar numero mágico
scene02.createCoordText = function(){
    if (this.firstPass){
        this.textX = game.add.text(CANVAS_WIDTH-15, CANVAS_HEIGHT/2, "X", { font: "15px Arial", fill: "#000000", align: "center" });
        this.textY = game.add.text(CANVAS_WIDTH/2+5, CANVAS_ORIGIN_Y, "Y", { font: "15px Arial", fill: "#000000", align: "center" });
        this.firstPass = false;
    }
}

scene02.drawDottedBox = function(clicked){
    var margin = 30
    if (!clicked){
        graphics.lineStyle(1, 0xFF0000, 1);
        console.logsdsfs
    } else {
        graphics.lineStyle(1, 0xFFFF00, 1);
    }
    dottedBox = graphics.drawRect(CANVAS_WIDTH + margin,CANVAS_ORIGIN_Y + margin, 100, CANVAS_HEIGHT/3 - margin);
}

scene02.onTap = function(){
    this.tap = true;
    this.prepareToDrag();
}

scene02.prepareToDrag = function(){
    var a = { font: "15px Arial", fill: '#FFFF00', align: "center" };
    clicked = true;
    this.textX.setStyle(a);
    this.textY.setStyle(a);
}