var scene03 = new Scene();
// var textR;
var piStep1QuadOk = false;
var piStep1RadiansAtan2;

scene03.create = function(){
    this.dot = new Phaser.Circle(75+CANVAS_WIDTH/2,-75 + CANVAS_HEIGHT/2,8);
	//this.tap = false;
    this.initialX = this.dot.x;
    this.initialY = this.dot.y;
    this.circulo = new Phaser.Circle(this.initialX,this.initialY,200);

	this.currentState = 0;
	//game.input.onTap.add(this.onTap,this);
    game.input.onDown.add(this.onTouchDown, this);
    game.input.onUp.add(this.onTouchUp, this);
    this.touchingScreen = false;
    piStep1RadiansAtan2 =0;
    this.parte2X;
    this.parte2Y;
    this.retangulo = new Phaser.Rectangle(CANVAS_WIDTH + scene02.margin,CANVAS_ORIGIN_Y + scene02.margin, 100, CANVAS_HEIGHT/3 - scene02.margin);
    
    this.textR = game.add.text(this.initialX + this.dot.diameter/2,this.initialY + this.dot.diameter/2,"R", { font: "24px Revalia", fill: "#000000", align: "center" });
    this.textR.alpha = 0;
}

scene03.input = function(){
    if(this.touchingScreen){
        if (!this.dot.isMoving && this.dot.contains(game.input.position.x, game.input.position.y)) {
            this.dot.isMoving = true;
            //this.currentState++;
        } else if (!this.circulo.isMoving && this.circulo.contains(game.input.position.x,game.input.position.y) && this.currentState == 2){
            this.circulo.isMoving = true;
        }
    }
    if (this.dot.isMoving) {
        if (this.currentState == 0) {
            if (game.input.position.x <= this.initialX + 100  && game.input.position.x >= this.initialX){
                this.dot.x = game.input.position.x;    
            }        
        } else if (this.currentState == 1) {
            var tmp;
            if(!piStep1QuadOk){
                tmp = Phaser.Math.clamp(Math.atan2(game.input.position.y - this.initialY, game.input.position.x - this.initialX), -Math.PI, 0);
            } else {
                tmp = Math.atan2(game.input.position.y - this.initialY, game.input.position.x - this.initialX);
            }
            if (tmp < -3) {
                piStep1QuadOk = true;
            } else if (tmp < 0) {
                piStep1QuadOk = false;
            }
            piStep1RadiansAtan2 = tmp;
            this.dot.x = Math.cos(piStep1RadiansAtan2) * 100 + this.initialX;
            this.dot.y = Math.sin(piStep1RadiansAtan2) * 100 + this.initialY;
            
            if (piStep1QuadOk && piStep1RadiansAtan2 < .2 && piStep1RadiansAtan2 > 0) {
                this.currentState++;
                //pointerGrabbed = false;
                this.dot.y = this.parte2Y;
                this.dot.isMoving = false;
                piTransition = true;
                this.touchingScreen = false;
            }
        }  
    } else if (this.circulo.isMoving){
        this.circulo.x = game.input.position.x;
        this.circulo.y = game.input.position.y;
        this.circulo.diameter = 30;
        
        

        console.log("OK");
        //circulo.isMoving = false;
        //circulo.radius = 
    }    
}

scene03.update = function(){
	this.input();
	if (this.currentState > 3) {
		//this.finished = true;
	}
}

scene03.render = function(){
	graphics.clear();
	createInnerCanvas();
	createCartesianPlan();
    this.createCoordText();
    this.drawDottedBox();
    if (this.currentState == 0){
		this.renderHorizontalTrail();	
	}else if (this.currentState >= 1){
		this.renderCircle();
	}
    
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
    //graphics.drawCircle(this.initialX,this.initialY,this.dot.diameter);
    this.textR.alpha = 1;
    // this.textR = game.add.text(this.initialX + this.dot.diameter/2,this.initialY + this.dot.diameter/2,"R", { font: "24px Revalia", fill: "#000000", align: "center" });
    this.renderDot();
}

scene03.renderCircle = function() {
    if (this.currentState < 2){
       graphics.lineStyle(5,0x29abe2);    
        
        graphics.moveTo(this.initialX, this.initialY);
        graphics.lineTo(this.initialX + 100, this.initialY);
        this.circuloGraphic = graphics.drawCircle(this.circulo.x,this.circulo.y,this.circulo.diameter);
        graphics.lineStyle(8,0x000000);
        graphics.arc(this.initialX, this.initialY, 100, 0, piStep1RadiansAtan2, true);    
    } else if (this.currentState == 2){
        graphics.lineStyle(3,0xFFd700);
        if (!this.circulo.isMoving){
            graphics.lineStyle(8,0xFFd700);    
        }
        this.circuloGraphic = graphics.drawCircle(this.circulo.x,this.circulo.y,this.circulo.diameter);
    } else if (this.currentState == 3){
        graphics.lineStyle(3,0x00FF00);
        this.circuloGraphic = graphics.drawCircle(773,88,this.circulo.diameter);
         console.log(this.circulo.x, this.circulo.y);
    }
    
    //graphics.moveTo(piStep0InitialPoint.x, piStep0InitialPoint.y);
    //graphics.lineTo(currentCursorPoint.x, currentCursorPoint.y);
    graphics.lineStyle(8,0x000000);
    
    if (this.currentState < 2){
        this.renderDot();
    }
    
}

scene03.onTouchDown = function() {
    this.touchingScreen = true;
}

scene03.onTouchUp = function() {
    if (this.currentState == 0){
        if (game.input.position.x >= this.initialX + 100 && this.dot.isMoving){
            this.currentState++;
            //this.parte2X = this.initialX + 100;
            this.parte2Y = this.dot.y;
        } 
    } else if (this.currentState == 2){
        if (this.retangulo.contains(game.input.position.x,game.input.position.y)){
            console.log("foi");
            this.currentState++;
        } else {
            this.circulo.diameter = 200;
        }
    }
    this.touchingScreen = false;
    this.dot.isMoving = false;
    this.circulo.isMoving = false;
}

scene03.drawDottedBox = function(){   
    graphics.lineStyle(3, 0x00FF00, 1);
    if (this.currentState == 2){
        graphics.lineStyle(3, 0xFFd700, 1);
    }
    this.dottedBox = graphics.drawRect(CANVAS_WIDTH + scene02.margin,CANVAS_ORIGIN_Y + scene02.margin, 100, CANVAS_HEIGHT/3 - scene02.margin);    
}

scene03.createCoordText = function(){
    if (this.firstPass){
        this.textX = game.add.text(CANVAS_WIDTH-15, CANVAS_HEIGHT/2+10, "X", { font: "15px Arial", fill: "#000000", align: "center" });
        this.textY = game.add.text(CANVAS_WIDTH/2+10, CANVAS_ORIGIN_Y+10, "Y", { font: "15px Arial", fill: "#000000", align: "center" });
        this.firstPass = false;
    }
}