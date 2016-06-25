var scene01 = new Scene();

scene01.create = function(){
    this.dot = graphics.drawCircle(CANVAS_WIDTH/2,CANVAS_HEIGHT/2,35);
    this.tap = false;
    game.input.onTap.add(this.onTap,this);
    createCartesianPlan();

}
scene01.update = function() {
    // limpa a tela
    graphics.clear();
    // desenha o canvas e o plano cartesiano
    createInnerCanvas();
    createCartesianPlan();
    
    graphics.lineStyle(5, 0x29abe2);
    graphics.drawCircle(CANVAS_WIDTH/2, CANVAS_HEIGHT/2, 64);
	
    console.log("Vsf");
    // Check tap
    if (this.tap) {
		this.tap = false;
		//this.dot.x = 400;
		this.dot.moveTo(400,300);
	}
}
scene01.render = function() {
    // createInnerCanvas();

}

scene01.onTap = function(){
	this.tap = true;
	console.log("Teste");
}