var scenes = [scene01];

var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 576;

var CANVAS_WIDTH = 716.8;
var CANVAS_HEIGHT = 460.8;

var canvasOriginX = 0;
var canvasOriginY = 0;

var graphics;
var canvasRect;

function createCartesianPlan(){
    graphics.beginFill(0x000000);
    graphics.lineStyle(1,0x000000,1);
    graphics.moveTo(canvasOriginX, CANVAS_HEIGHT/2);
    graphics.lineTo(CANVAS_WIDTH, CANVAS_HEIGHT/2);
    graphics.endFill();

    graphics.beginFill(0x000000);
    graphics.lineStyle(1,0x000000,1);
    graphics.moveTo(CANVAS_WIDTH/2, canvasOriginY);
    graphics.lineTo(CANVAS_WIDTH/2, CANVAS_HEIGHT);
    graphics.endFill();
}


function createInnerCanvas() {
    graphics.lineStyle(1,0x000000, 1);
    canvasRect = graphics.drawRect(canvasOriginX,canvasOriginY,CANVAS_WIDTH,CANVAS_HEIGHT);
}