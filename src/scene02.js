var scene02 = new Scene();

scene02.create = function() {
    this.margin = 30;
    this.currentState = 0;
    this.firstPass = true;
    game.input.onDown.add(this.onTouchDown, this);
    game.input.onUp.add(this.onTouchUp, this);
    this.touchingScreen = false;
    this.retangulo = new Phaser.Rectangle(CANVAS_WIDTH + this.margin,CANVAS_ORIGIN_Y + this.margin, 100, CANVAS_HEIGHT/3 - this.margin);
}
scene02.render = function() {
    graphics.clear();
    createInnerCanvas();
    createCartesianPlan();
    if (this.currentState == 0){
        this.createCoordText();
    }
}

scene02.update = function() {
    this.input();
    if(this.currentState == 0){
        this.drawDottedBox(false);
    } else if(this.currentState <= 2){
        this.drawDottedBox(true);
    } else if(this.currentState >= 3){
        this.drawReadyBox();
    }
}

scene02.input = function(){
    if (this.currentState == 0 && this.touchingScreen) {
        if(this.retangulo.contains(game.input.position.x, game.input.position.y)){
            this.prepareToDrag();
        }
    }
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
    
    if (!clicked){
        graphics.lineStyle(1, 0xFF0000, 1);
    } else {
        graphics.lineStyle(1, 0xFFFF00, 1);
    }
    this.dottedBox = graphics.drawRect(CANVAS_WIDTH + this.margin,CANVAS_ORIGIN_Y + this.argin, 100, CANVAS_HEIGHT/3 - this.margin);    
}

scene02.drawReadyBox = function(){
    graphics.lineStyle(1, 0x00FF00, 1);
    this.dottedBox = graphics.drawRect(CANVAS_WIDTH + this.margin,CANVAS_ORIGIN_Y + this.argin, 100, CANVAS_HEIGHT/3 - this.margin);    
    this.finished = true;
}


scene02.prepareToDrag = function(){
    if (this.currentState < 1){
        this.currentState = 1;    
    }
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
    text.events.onInputOut.add(this.out, this);
}

scene02.out = function(item){
    var b = { font: "15px Arial", fill: '#00FF00', align: "center" };
    if (this.retangulo.contains(item.x,item.y)){
        if(item == this.textX){
            this.textX.setStyle(b);
            this.textX.input.disableDrag();
            this.textX2 = game.add.text(CANVAS_WIDTH-15, CANVAS_HEIGHT/2, "X", { font: "15px Arial", fill: "#000000", align: "center" });
            this.currentState++;
        } else {
            this.textY.setStyle(b);
            this.textY.input.disableDrag();
            this.textY2 = game.add.text(CANVAS_WIDTH/2+5, CANVAS_ORIGIN_Y, "Y", { font: "15px Arial", fill: "#000000", align: "center" });
            this.currentState++;
        }
    }
}

scene02.onTouchDown = function(item){
    this.touchingScreen = true;
}

scene02.onTouchUp = function(item){
    this.touchingScreen = false;
}