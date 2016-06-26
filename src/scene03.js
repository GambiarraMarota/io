var scene03 = new Scene();
var textR;

scene03.create = function(){

    this.dot = new Phaser.Circle(75+CANVAS_WIDTH/2,-75 + CANVAS_HEIGHT/2,8);
	//this.tap = false;
    this.initialX = this.dot.x;
    this.initialY = this.dot.y;

	this.currentState = 0;
	//game.input.onTap.add(this.onTap,this);
    game.input.onDown.add(this.onTouchDown, this);
    game.input.onUp.add(this.onTouchUp, this);
    this.touchingScreen = false;
}

scene03.input = function(){
    if(this.touchingScreen){
        if (!this.dot.isMoving && this.dot.contains(game.input.position.x, game.input.position.y)) {
            this.dot.isMoving = true;
            //this.currentState++;
        }
    } else {
        if (this.currentState == 0) {
            
            /*if (Phaser.Circle.intersects(this.dot, this.targetDotX)) {
                this.dot.x = CANVAS_WIDTH / 2;
                this.dot.y = CANVAS_HEIGHT / 2;
                this.currentState++;
            }*/
        }
    }
    if (this.dot.isMoving) {
        if (this.currentState == 0) {
            if (game.input.position.x <= this.initialX + 100  && game.input.position.x >= this.initialX){
                this.dot.x = game.input.position.x;    
            }

            
        } else if (this.currentState == 1) {
            //this.dot.y = game.input.position.y;
            this.dot.y = Math.sin(game.input.position.y)*100+this.initialY;
            this.dot.x = Math.cos(game.input.position.x)*100+this.initialX;
        }
    }
}

scene03.update = function(){
	this.input();
    /*if (this.tap) {
		this.tap = false;
		this.currentState++;
	}*/
	if (this.currentState > 3) {
		this.finished = true;
	}
}

scene03.render = function(){
	graphics.clear();
	createInnerCanvas();
	createCartesianPlan();
    this.createCoordText();
    this.drawDottedBox();
	//if (this.currentState == 1) {
	
	//}
    if (this.currentState == 0){
		this.renderHorizontalTrail();	
	}else if (this.currentState == 1){
		this.renderCircle();
	}
	else {
		this.finished = true;
	}
    this.renderDot();
}

scene03.renderDot = function() {
    	//graphics.lineStyle(4, 0x444444);
    	graphics.lineStyle(8,0x000);
    	graphics.moveTo(this.dot.x, this.dot.y);
		graphics.drawCircle(this.dot.x,this.dot.y,this.dot.diameter);
}

scene03.renderHorizontalTrail = function() {
    graphics.lineStyle(5,0x29abe2);
    graphics.moveTo(this.initialX, this.initialY);
    graphics.lineTo(this.initialX + 100, this.initialY);
    graphics.drawCircle(this.initialX,this.initialY,this.dot.diameter);
    this.textR = game.add.text(this.initialX + this.dot.diameter/2,this.initialY + this.dot.diameter/2,"R", { font: "15px Arial", fill: "#000000", align: "center" });
}

scene03.renderCircle = function() {
    graphics.lineStyle(8,0x29abe2);
    graphics.moveTo(this.initialX, this.initialY);
    graphics.lineTo(this.initialX + 100, this.initialY);
    graphics.drawCircle(this.initialX,this.initialY,this.dot.diameter);
    graphics.drawCircle(this.initialX,this.initialY,200);
}

/*scene03.onTap = function(){
	this.tap = true;
	console.log("Teste");
}*/

scene03.onTouchDown = function() {
    this.touchingScreen = true;
}

scene03.onTouchUp = function() {
    if (this.currentState == 0){
        if (game.input.position.x >= this.initialX + 100 && this.dot.isMoving){
            this.currentState++;
        }    
    }
    this.touchingScreen = false;
    this.dot.isMoving = false;
}

scene03.drawDottedBox = function(clicked){   
    graphics.lineStyle(3, 0x00FF00, 1);
    this.dottedBox = graphics.drawRect(CANVAS_WIDTH + scene02.margin,CANVAS_ORIGIN_Y + scene02.margin, 100, CANVAS_HEIGHT/3 - scene02.margin);    
}

scene03.createCoordText = function(){
    if (this.firstPass){
        this.textX = game.add.text(CANVAS_WIDTH-15, CANVAS_HEIGHT/2+10, "X", { font: "15px Arial", fill: "#000000", align: "center" });
        this.textY = game.add.text(CANVAS_WIDTH/2+10, CANVAS_ORIGIN_Y+10, "Y", { font: "15px Arial", fill: "#000000", align: "center" });
        this.firstPass = false;
    }
}