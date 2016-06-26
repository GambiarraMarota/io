var scenes = [scene01, scene02, scene03, scene04];

var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 576;

var CANVAS_WIDTH = 716.8;
var CANVAS_HEIGHT = 460.8;

var CANVAS_ORIGIN_X = 0;
var CANVAS_ORIGIN_Y = 0;

var CANVAS_CENTER_X = CANVAS_WIDTH/2;
var CANVAS_CENTER_Y = CANVAS_HEIGHT/2;

var graphics;	
var canvasRect;

function createCartesianPlan() {
    graphics.lineStyle(5, 0xff9f00);
    graphics.moveTo(CANVAS_ORIGIN_X, CANVAS_HEIGHT/2);
    graphics.lineTo(CANVAS_WIDTH, CANVAS_HEIGHT/2);
    
    graphics.lineStyle(5, 0xcc6633);
    graphics.moveTo(CANVAS_WIDTH/2, CANVAS_ORIGIN_Y);
    graphics.lineTo(CANVAS_WIDTH/2, CANVAS_HEIGHT);
}


function createInnerCanvas() {
    graphics.lineStyle(4,0x777777);
    canvasRect = graphics.drawRect(CANVAS_ORIGIN_X+2,CANVAS_ORIGIN_Y+2,CANVAS_WIDTH,CANVAS_HEIGHT);
}