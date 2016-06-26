var scene03 = new Scene();
scene02.finished = true;
var textR;

scene03.create = function(){
	this.dot = new Phaser.Circle(75+CANVAS_WIDTH/2,-75 + CANVAS_HEIGHT/2,8);
	this.tap = false;

	this.currentState = 0;
	game.input.onTap.add(this.onTap,this);
}

scene03.update = function(){
	if (this.tap) {
		this.tap = false;
		this.currentState++;
	}
}

scene03.render = function(){
	graphics.clear();
	createInnerCanvas();
	createCartesianPlan();
	if (this.currentState == 0) {
		createCartesianPlan();
	}else if (this.currentState == 1) {
		this.renderHorizontalTrail();
	}else if (this.currentState == 2){
		this.renderHorizontalTrail();	
	}else if (this.currentState == 3){
		this.renderHorizontalTrail();
	}
	else {
		this.finished = true;
		
	}
}

scene03.renderHorizontalTrail = function() {
    	//graphics.lineStyle(4, 0x444444);
    	graphics.lineStyle(8,0x29abe2);
    	graphics.moveTo(this.dot.x, this.dot.y);
    if (this.currentState == 1) {
		graphics.drawCircle(this.dot.x,this.dot.y,this.dot.diameter);
    	
    }
    if (this.currentState == 2) {
    	graphics.lineTo(this.dot.x + 50, this.dot.y);
		graphics.drawCircle(this.dot.x,this.dot.y,this.dot.diameter);
    	this.textR = game.add.text(this.dot.x + this.dot.diameter/2,this.dot.y + this.dot.diameter/2,"R", { font: "15px Arial", fill: "#000000", align: "center" });
    }
    if (this.currentState >= 3) {
		graphics.lineTo(this.dot.x + 50, this.dot.y);
		graphics.drawCircle(this.dot.x,this.dot.y,this.dot.diameter);
    	graphics.drawCircle(this.dot.x,this.dot.y,100);
    }

}

scene03.onTap = function(){
	this.tap = true;
	console.log("Teste");
}