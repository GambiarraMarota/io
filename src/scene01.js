var scene01 = new Scene();

scene01.create = function() {
    // declarações de ponto controlado pelo jogador
    this.dot = new Phaser.Circle(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, 48);
    this.dot.isMoving = false;
    
    // declarações de pontos objetivos
    this.targetDotX = new Phaser.Circle(CANVAS_WIDTH - 96 , CANVAS_HEIGHT / 2, 48);
    this.targetDotX.color = 0xff9f00;
    this.targetDotX.stateTime = .15;
    
    this.targetDotY = new Phaser.Circle(CANVAS_WIDTH / 2, 64, 48);
    this.targetDotY.color = 0xcc6633;
    this.targetDotY.stateTime = 0;

    this.touchingScreen = false;
    this.stateTime = 0;
    
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
                // game.time.events.add(.2, this.shrinkTargetX, this);
            }
        } else if (this.currentState == 1) { // segundo alvo: eixo y
            // disappear with target x smoothly
            // this.targetDotX.diameter = Phaser.Math.linear(this.targetDotX.diameter, 0, .2);
            // t: current time, b: begInnIng value, c: change In value, d: duration
            this.targetDotX.diameter = easeInBack(this.targetDotX.stateTime, 50 , -1, .2);
            if (Phaser.Circle.intersects(this.dot, this.targetDotY)) {
                this.dot.x = CANVAS_WIDTH / 2;
                this.dot.y = CANVAS_HEIGHT / 2;
                this.currentState++;
            }
            console.log(this.targetDotX.stateTime);
            this.targetDotX.stateTime += game.time.elapsed/1000.0;
        } else {
            this.targetDotY.diameter = Phaser.Math.linear(this.targetDotY.diameter, 0, .2);
            if (this.targetDotY.diameter < 3) {
                this.finished = true;
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

scene01.shrinkTargetX = function() {
    this.targetDotX.diameter -= 4;
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
        createCartesianPlan();
    }
    
    // círculos alvo
    if (this.currentState >= 0) { // círculo do eixo x
        graphics.lineStyle(5, this.currentState == 0 ? 0x99aabb : 0xff9f00);
        graphics.drawCircle(this.targetDotX.x, this.targetDotX.y, this.targetDotX.diameter
                            + Phaser.Math.clamp(Math.sin(game.time.totalElapsedSeconds() * 2), -1, 1) * 4);
        
        if (this.currentState > 0) {
            graphics.lineStyle(5, 0xff9f00);
            var clampedDistance = Phaser.Math.clamp(Math.sin(game.time.totalElapsedSeconds() * 6), 0, 1) * 6;
            graphics.moveTo(CANVAS_WIDTH - 112 + clampedDistance, CANVAS_CENTER_Y - 12, this.targetDotX.diameter);
            graphics.lineTo(CANVAS_WIDTH - 94 + clampedDistance, CANVAS_CENTER_Y, this.targetDotX.diameter);
            graphics.lineTo(CANVAS_WIDTH - 112 + clampedDistance, CANVAS_CENTER_Y + 12, this.targetDotX.diameter);
        }
        
    }

    if (this.currentState > 0) {
        console.log("hahahahah");
        graphics.lineStyle(5, this.currentState < 2 ? 0x99aabb : 0xcc6633);
        graphics.drawCircle(this.targetDotY.x, this.targetDotY.y, this.targetDotY.diameter
                            + Phaser.Math.clamp(Math.sin(game.time.totalElapsedSeconds() * 2), -1, 1) * 4);
        
        if (this.currentState > 1) {
            graphics.lineStyle(5, 0xcc6633);
            var clampedDistance = Phaser.Math.clamp(Math.sin(game.time.totalElapsedSeconds() * 6), 0, 1) * 6;
            graphics.moveTo(CANVAS_CENTER_X - 12, 80 - clampedDistance, this.targetDotX.diameter);
            graphics.lineTo(CANVAS_CENTER_X, 64 - clampedDistance, this.targetDotX.diameter);
            graphics.lineTo(CANVAS_CENTER_X + 12, 80 - clampedDistance, this.targetDotX.diameter);
        }
    } 
    
    // renderiza o círculo que o usuário pode controlar
    graphics.lineStyle(5, 0x29abe2);
    graphics.drawCircle(this.dot.x, this.dot.y,
                        this.dot.diameter + Phaser.Math.clamp(Math.sin(game.time.totalElapsedSeconds() * 4) + .6, 0, 1) * 5);
    graphics.lineStyle(20,0x29abe2);
    graphics.drawCircle(this.dot.x, this.dot.y,
                        this.dot.diameter/5 + Phaser.Math.clamp(Math.sin(game.time.totalElapsedSeconds() * 4), 0, 1) * 5);
}

scene01.renderHorizontalPreTrail = function(){
    graphics.lineStyle(4,0x444444, .4);
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