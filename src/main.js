var game = new Phaser.Game(WINDOW_WIDTH, WINDOW_HEIGHT, Phaser.AUTO, 'main-canvas', { preload: preload, create: create, render: render, update: update });
// cena atual que o usuário precisa percorrer

function preload(){

}

function create() {
    //  Load the Google WebFont Loader script
    game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

    game.stage.backgroundColor = '#f0f0f0';
    graphics = game.add.graphics(0,0);
    scenes[0].create();

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