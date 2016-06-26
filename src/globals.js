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
    graphics.lineStyle(1,0x444444);
    graphics.moveTo(CANVAS_ORIGIN_X,CANVAS_CENTER_Y);
    graphics.lineTo(CANVAS_WIDTH,   CANVAS_CENTER_Y);
    graphics.moveTo(CANVAS_CENTER_X, CANVAS_HEIGHT);
    graphics.lineTo(CANVAS_CENTER_X, CANVAS_ORIGIN_Y);

    graphics.lineStyle(4, 0xff9f00);
    graphics.moveTo(CANVAS_CENTER_X, CANVAS_HEIGHT/2);
    graphics.lineTo(CANVAS_WIDTH - 96, CANVAS_HEIGHT/2);
    
    graphics.lineStyle(4, 0xcc6633);
    // graphics.moveTo(CANVAS_WIDTH/2, CANVAS_CENTER_Y);
    // graphics.lineTo(CANVAS_WIDTH/2, CANVAS_HEIGHT*(-1));
    graphics.moveTo(CANVAS_CENTER_X,CANVAS_CENTER_Y);
    graphics.lineTo(CANVAS_CENTER_X,64);
    
    // desenha setas
    // seta horizontal
    graphics.lineStyle(5, 0xff9f00);
    var clampedDistance = Phaser.Math.clamp(Math.sin(game.time.totalElapsedSeconds() * 6), 0, 1) * 6;
    graphics.moveTo(CANVAS_WIDTH - 112 + clampedDistance, CANVAS_CENTER_Y - 12);
    graphics.lineTo(CANVAS_WIDTH - 94 + clampedDistance, CANVAS_CENTER_Y);
    graphics.lineTo(CANVAS_WIDTH - 112 + clampedDistance, CANVAS_CENTER_Y + 12);
    
    // seta vertical
    graphics.lineStyle(5, 0xcc6633);
    var clampedDistance = Phaser.Math.clamp(Math.sin(game.time.totalElapsedSeconds() * 6), 0, 1) * 6;
    graphics.moveTo(CANVAS_CENTER_X - 12, 80 - clampedDistance);
    graphics.lineTo(CANVAS_CENTER_X, 64 - clampedDistance);
    graphics.lineTo(CANVAS_CENTER_X + 12, 80 - clampedDistance);
}


function createInnerCanvas() {
    graphics.lineStyle(4,0x777777);
    canvasRect = graphics.drawRect(CANVAS_ORIGIN_X+2,CANVAS_ORIGIN_Y+2,CANVAS_WIDTH,CANVAS_HEIGHT);
}

// t: current time, b: begInnIng value, c: change In value, d: duration
easeInBack = function (t, b, c, d, s) {
    if (s == undefined) s = 1.70158;
    return c*(t/=d)*t*((s+1)*t - s) + b;
}