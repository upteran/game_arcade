export default class Camera {
    constructor(game, player, stage) {
        this.game = game;
        this.stage = stage;
        this.target = player.body;
        this.view = this._drawRect(0, 0, this.game.sceneW, 500);
        this.deadzoneX = 200;
        this.view.position.x = 0;
        this.view.position.y = 0;
    }
    _drawRect( x, y, width, height ) {
        let rect;
        rect = new PIXI.Graphics();
        rect.beginFill(0, 0);
        rect.drawRect(x, y, this.game.sceneW, 500);
        rect.endFill();
        return rect;
    }
    update(){
        if( this.target.position.x - this.view.position.x + this.deadzoneX > this.game.sceneW ) {
            this.view.position.x = this.target.position.x + (this.deadzoneX - this.game.sceneW);
            this.game.scene.position.x = -this.view.position.x;
            this.stage.move();
        } else if ( this.target.position.x - this.deadzoneX < this.view.position.x ) {
            this.view.position.x = this.target.position.x - this.deadzoneX;
            this.game.scene.position.x = -this.view.position.x;
            this.stage.move();
        }
    }
    init(){
        this.game.scene.addChild( this.view );
    }
}