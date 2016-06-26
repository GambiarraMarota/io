var scene01 = new Scene();

scene01.create = function() {
    this.dot = new Phaser.Circle(CANVAS_WIDTH/2, CANVAS_HEIGHT/2, 48);
    
    this.tap = false;
    
    // Estados de tela para essa cena
    this.currentState = 0;
    game.input.onTap.add(this.onTap,this);
}

scene01.update = function() {	
    // console.log("Vsf");
    // Check tap
    if (this.tap) {
		this.tap = false;
		this.currentState++;
	}
}

scene01.render = function() {
    // limpa a tela
    graphics.clear();
    // desenha o canvas e o plano cartesiano
    createInnerCanvas();
    
    if (this.currentState == 0) {
        this.renderHorizontalTrail();
    } else if (this.currentState == 1) {
        this.renderHorizontalTrail();
        this.renderVerticalTrail();
    }
     else {
        createCartesianPlan();
    }
    
    // renderiza o círculo que o usuário pode controlar
    graphics.lineStyle(5, 0x29abe2);
    graphics.drawCircle(this.dot.x, this.dot.y, this.dot.diameter);
}

scene01.renderHorizontalTrail = function() {
    graphics.lineStyle(4, 0x444444);
    graphics.moveTo(CANVAS_CENTER_X, CANVAS_CENTER_Y);
    graphics.lineTo(CANVAS_CENTER_X + CANVAS_WIDTH/2, CANVAS_CENTER_Y);
}

scene01.renderVerticalTrail = function(){
    graphics.lineStyle(4,0x444444); 
    graphics.moveTo(CANVAS_CENTER_X,CANVAS_CENTER_Y);
    graphics.lineTo(CANVAS_CENTER_X,CANVAS_CENTER_Y - CANVAS_HEIGHT/2);
}
scene01.onTap = function(){
	this.tap = true;
	console.log("Teste");
}