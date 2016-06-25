var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 576;

var CANVAS_WIDTH = 716.8;
var CANVAS_HEIGHT = 460.8;

var canvasOriginX = 0;
var canvasOriginY = 0;

//var currentScene;
var graphics;

var scenes = [scene01];

var coordX;
var coordY;
var canvasRect;

function cartesianPlan(){


    graphics.drawLine()

    game.debug.geom(coordX, '#000000');
    game.debug.geom(coordY, '#000000');
}

function initCartesianPlan(){
    coordX = new Phaser.Line(
        0,game.world.centerY,
        game.world.width,game.world.centerY);
    coordY = new Phaser.Line(
        game.world.centerX,0,
        game.world.centerX,game.world.height);
}


function createInnerCanvas() {
    graphics.lineStyle(1,0x000000, 1);
    canvasRect = graphics.drawRect(canvasOriginX,canvasOriginY,CANVAS_WIDTH,CANVAS_HEIGHT);
}

function drawInnerCanvas(){
    
}