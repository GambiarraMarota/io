var scene01 = new Scene();

scene01.create = function() {
    // declarações de ponto controlado pelo jogador
    this.dot = new Phaser.Circle(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, 48);
    this.dot.isMoving = false;
    
    // declarações de pontos objetivos
    this.targetDotX = new Phaser.Circle(CANVAS_WIDTH - 96 , CANVAS_HEIGHT / 2, 48);
    this.targetDotX.color = 0xff9f00;
    this.targetDotY = new Phaser.Circle(CANVAS_WIDTH / 2, 64, 48);
    this.targetDotY.color = 0xcc6633;

    this.touchingScreen = false;
    
    // Estados de tela para essa cena
    this.currentState = 0;
    game.input.onDown.add(this.onTouchDown, this);
    game.input.onUp.add(this.onTouchUp, this);
}

scene01.update = function() {	
    // Check tap
    if (this.touchingScreen) {
        if (!this.dot.isMoving && this.dot.contains(game.input.position.x, game.input.position.y)) {
            this.dot.isMoving = true;
        }
    } else {
        // verifica colisões com o alvo
        if (this.currentState == 0) { // primeiro alvo: eixo x
            if (Phaser.Circle.intersects(this.dot, this.targetDotX)) {
                this.dot.x = CANVAS_WIDTH / 2;
                this.dot.y = CANVAS_HEIGHT / 2;
                this.currentState++;
            }
        } else if (this.currentState == 1) { // segundo alvo: eixo y
            if (Phaser.Circle.intersects(this.dot, this.targetDotY)) {
                this.dot.x = CANVAS_WIDTH / 2;
                this.dot.y = CANVAS_HEIGHT / 2;
                this.currentState++;
            }
        }
    }
    if (this.dot.isMoving) {
        if (this.currentState == 0) {
            this.dot.x = game.input.position.x;
        } else if (this.currentState == 1) {
            this.dot.y = game.input.position.y;
        }
    }
}

scene01.render = function() {
    // limpa a tela
    graphics.clear();
    // desenha o canvas e o plano cartesiano
    createInnerCanvas();
    
    if (this.currentState == 0) {
        this.renderHorizontalPreTrail();
    } else if (this.currentState == 1) {
        this.renderHorizontalTrail();
        this.renderVerticalPreTrail();
    }else {
        this.finished = true;
        createCartesianPlan();
    }
    
    // círculos alvo
    graphics.lineStyle(5, this.currentState == 0 ? 0x99aabb : 0xcccccc);
    graphics.drawCircle(this.targetDotX.x, this.targetDotX.y, this.targetDotX.diameter);
    
    graphics.lineStyle(5, this.currentState <= 1 ? 0x99aabb : 0xcccccc);
    graphics.drawCircle(this.targetDotY.x, this.targetDotY.y, this.targetDotY.diameter);
    
    // renderiza o círculo que o usuário pode controlar
    graphics.lineStyle(5, 0x29abe2);
    graphics.drawCircle(this.dot.x, this.dot.y, this.dot.diameter);
    graphics.lineStyle(20,0x29abe2);
    graphics.drawCircle(this.dot.x, this.dot.y, this.dot.diameter/5);
}
scene01.renderHorizontalPreTrail = function(){
    graphics.lineStyle(4,0x444444);
    graphics.moveTo(CANVAS_CENTER_X, CANVAS_CENTER_Y);
    graphics.lineTo(CANVAS_WIDTH - 96 , CANVAS_CENTER_Y);
    //traços verticais pra artificiar o pontilhado,tentei usando for mas nao funcionou #HARDCODE!
    graphics.lineStyle(20,0xcccccc);
    graphics.moveTo(CANVAS_CENTER_X + 50,CANVAS_CENTER_Y - 50);
    graphics.lineTo(CANVAS_CENTER_X + 50,CANVAS_CENTER_Y + 50);
    graphics.moveTo(CANVAS_CENTER_X + 115,CANVAS_CENTER_Y - 50);
    graphics.lineTo(CANVAS_CENTER_X + 115,CANVAS_CENTER_Y + 50);
    graphics.moveTo(CANVAS_CENTER_X + 180,CANVAS_CENTER_Y - 50);
    graphics.lineTo(CANVAS_CENTER_X + 180,CANVAS_CENTER_Y + 50);
    
}
scene01.renderHorizontalTrail = function() {
    graphics.lineStyle(4, 0xff9f00);
    graphics.moveTo(CANVAS_CENTER_X, CANVAS_CENTER_Y);
    graphics.lineTo(CANVAS_WIDTH - 96, CANVAS_CENTER_Y);
        
}
scene01.renderVerticalPreTrail = function(){
    graphics.lineStyle(4,0x444444); 
    graphics.moveTo(CANVAS_CENTER_X,CANVAS_CENTER_Y);
    graphics.lineTo(CANVAS_CENTER_X,64);

    //traços horizontais pra artificar o pontilhado
    graphics.lineStyle(20,0xcccccc);
    graphics.moveTo(CANVAS_CENTER_X - 50,CANVAS_CENTER_Y - 50);
    graphics.lineTo(CANVAS_CENTER_X + 50,CANVAS_CENTER_Y - 50);
    graphics.moveTo(CANVAS_CENTER_X - 50,CANVAS_CENTER_Y - 100);
    graphics.lineTo(CANVAS_CENTER_X + 50,CANVAS_CENTER_Y - 100);
    graphics.moveTo(CANVAS_CENTER_X - 50,CANVAS_CENTER_Y - 150);
    graphics.lineTo(CANVAS_CENTER_X + 50,CANVAS_CENTER_Y - 150);
}
//metodo inutilizado apos alteracoes
scene01.renderVerticalTrail = function(){
    graphics.lineStyle(4,0xcc6633); 
    graphics.moveTo(CANVAS_CENTER_X,CANVAS_CENTER_Y);
    graphics.lineTo(CANVAS_CENTER_X,CANVAS_CENTER_Y - CANVAS_HEIGHT/2);
}

scene01.onTouchDown = function() {
    this.touchingScreen = true;
}

scene01.onTouchUp = function() {
    this.touchingScreen = false;
    this.dot.isMoving = false;
}