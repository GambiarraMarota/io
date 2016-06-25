var game = new Phaser.Game(WINDOW_WIDTH, WINDOW_HEIGHT, Phaser.AUTO, 'main-canvas', { preload: preload, create: create, render: render, update: update });
// cena atual que o usuário precisa percorrer

var circle;

function preload(){

}

function create() {

    circle = new Phaser.Circle(120, 130, 100);
    game.backgroundColor = '#cccccc';
    currentScene = scene01;
    graphics = game.add.graphics(0,0);

    // inicializa create em todas as cenas
    // for()...
}

function render() {
    //game.debug.geom(circle, '#CCCCCC');
    currentScene.render();
}

function update() {
    currentScene.update();
}