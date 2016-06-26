var scene04 = new Scene();

scene04.create = function (){
	this.retangulo = new Phaser.Rectangle (CANVAS_WIDTH + 30,CANVAS_ORIGIN_Y + 30, 100, CANVAS_HEIGHT/3 - 30);	
	this.retangulo.color = 0xFFFF00;
	this.retangulo.lineStyle = 5;

	this.dot = new Phaser.Circle (75+CANVAS_WIDTH/2,-75 + CANVAS_HEIGHT/2,8);
	this.dot.color = 0x0000FF;
	this.dot.lineStyle = 5;

	this.playButton = new Phaser.Circle(CANVAS_CENTER_X + 320, 32, 48);
	this.playButton.color = 0x00BF23;
	this.playButton.lineStyle = 3;

	this.currentState = 0;

	game.input.onTap.add(this.onTap, this);
}

scene04.update = function(){
	if (this.tap) {
		this.tap = false;
		this.currentState++;

	}
}

scene04.render = function(){
	graphics.clear();

	createInnerCanvas();
	createCartesianPlan();
	
	graphics.lineStyle(this.retangulo.lineStyle,this.retangulo.color);
	graphics.drawRect(this.retangulo.x,this.retangulo.y,
	this.retangulo.width,this.retangulo.height);
	if (this.currentState > 1) {
		graphics.lineStyle(this.dot.lineStyle,this.dot.color);
		graphics.drawCircle(this.dot.x,this.dot.y,100);
	}
	if (this.currentState > 2) {
		// desenhar sprite
	}
	if (this.currentState > 3) {
		graphics.lineStyle(this.playButton.lineStyle, this.playButton.color);
		graphics.drawCircle(this.playButton.x, this.playButton.y, this.playButton.diameter);
	}
}

scene04.onTap = function() {
	this.tap = true;
}
