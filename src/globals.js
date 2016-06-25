var scenes = [scene01, scene02];

var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 576;

var CANVAS_WIDTH = 716.8;
var CANVAS_HEIGHT = 460.8;

var CANVAS_ORIGIN_X = 0;
var CANVAS_ORIGIN_Y = 0;

var CANVAS_CENTER_X = CANVAS_WIDTH/2;
var CANVAS_CENTER_X = CANVAS_HEIGHT/2;

var graphics;
var canvasRect;

function createCartesianPlan(){
    graphics.beginFill(0x000000);
    graphics.lineStyle(1,0x000000,1);
    graphics.moveTo(CANVAS_ORIGIN_X, CANVAS_HEIGHT/2);
    graphics.lineTo(CANVAS_WIDTH, CANVAS_HEIGHT/2);
    graphics.endFill();

    graphics.beginFill(0x000000);
    graphics.lineStyle(1,0x000000,1);
    graphics.moveTo(CANVAS_WIDTH/2, CANVAS_ORIGIN_Y);
    graphics.lineTo(CANVAS_WIDTH/2, CANVAS_HEIGHT);
    graphics.endFill();
}


function createInnerCanvas() {
    graphics.lineStyle(1,0x000000, 1);
    canvasRect = graphics.drawRect(CANVAS_ORIGIN_X,CANVAS_ORIGIN_Y,CANVAS_WIDTH,CANVAS_HEIGHT);
}