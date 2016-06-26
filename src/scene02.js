var scene02 = new Scene();

var textX;
var textY;
var dottedBox;
var clicked;
var ready = 0;

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
    } else if (clicked && (ready >= 2)){
        graphics.lineStyle(1, 0x00FF00, 1);
        this.finished = true;
    } else {
        graphics.lineStyle(1, 0xFFFF00, 1);
    }
    dottedBox = graphics.drawRect(CANVAS_WIDTH + margin,CANVAS_ORIGIN_Y + margin, 100, CANVAS_HEIGHT/3 - margin);
    retangulo = new Phaser.Rectangle(CANVAS_WIDTH + margin,CANVAS_ORIGIN_Y + margin, 100, CANVAS_HEIGHT/3 - margin);
}

scene02.onTap = function(){
    this.tap = true;
    this.prepareToDrag();
}

scene02.prepareToDrag = function(){
    clicked = true;

    //muda a cor da fonte para ajudar a ver o drag and drop
    var a = { font: "15px Arial", fill: '#FFFF00', align: "center" };
    this.textX.setStyle(a);
    this.textY.setStyle(a);

    //habilita o drag and drop
    this.dragText(this.textX);
    this.dragText(this.textY);
}

scene02.dragText = function(text){
    text.inputEnabled = true;
    text.input.enableDrag();

    //text.events.onInputOver.add(over, this);
    text.events.onInputOut.add(this.out, this);

    //text.events.onInputDown.add(down, this);
   // text.events.onInputUp.add(this.up, this);
}

scene02.out = function(item){
    var b = { font: "15px Arial", fill: '#00FF00', align: "center" };
    if (retangulo.contains(item.x,item.y)){
        if(item == this.textX){
            this.textX.setStyle(b);
            this.textX.input.disableDrag();
            this.textX2 = game.add.text(CANVAS_WIDTH-15, CANVAS_HEIGHT/2, "X", { font: "15px Arial", fill: "#000000", align: "center" });
            ready++;
        } else {
            this.textY.setStyle(b);
            this.textY.input.disableDrag();
            this.textY2 = game.add.text(CANVAS_WIDTH/2+5, CANVAS_ORIGIN_Y, "Y", { font: "15px Arial", fill: "#000000", align: "center" });
            ready++;
        }
    }
}