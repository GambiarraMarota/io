var game = new Phaser.Game(WINDOW_WIDTH, WINDOW_HEIGHT, Phaser.AUTO, 'main-canvas', { preload: preload, create: create, render: render, update: update });
// cena atual que o usuário precisa percorrer

function preload(){

}

function create() {
    game.stage.backgroundColor = '#cccccc';
    graphics = game.add.graphics(0,0);
    scenes[0].create();
    createInnerCanvas();

    var length = scenes.length;
    for (var index = 0; index < length; index++){
        scenes[index].create();
    }
}

//TODO: generalizar funcao com o update
function render() {
    var length = scenes.length;
    for (var index = 0; index < length; index++){
        if (!scenes[index].finished) {
            scenes[index].render();
            break;
        }
    }
}

function update() {
    var length = scenes.length;
    for (var index = 0; index < length; index++){
        if (!scenes[index].finished) {
            scenes[index].update();
            break;
        }
    }
}