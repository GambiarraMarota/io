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
    graphics.lineStyle(5, 0xff9f00);
    graphics.moveTo(canvasOriginX, CANVAS_HEIGHT/2);
    graphics.lineTo(CANVAS_WIDTH, CANVAS_HEIGHT/2);

    graphics.lineStyle(5, 0xcc6633);
    graphics.moveTo(CANVAS_WIDTH/2, canvasOriginY);
    graphics.lineTo(CANVAS_WIDTH/2, CANVAS_HEIGHT);
}


function createInnerCanvas() {
    graphics.lineStyle(4,0x777777);
    canvasRect = graphics.drawRect(canvasOriginX+2,canvasOriginY+2,CANVAS_WIDTH,CANVAS_HEIGHT);
}