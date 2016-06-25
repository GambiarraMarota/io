function Scene() {
    this.finished = false;
    
    this.render = function() {
        graphics.beginFill(0xFF0000);
        graphics.drawRect(0,0,500,500);
        graphics.endFill();
    };

    this.update = function() {
        console.log("teste");
    };
};
