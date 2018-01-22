import * as PIXI from 'pixi.js';

export default class Camera {
    constructor(game, player, stage) {
        this.game = game;
        this.stage = stage;
        this.target = player.body;
        this.view = this._drawRect(0, 0, this.game.sceneW, this.game.sceneH);
        this.deadzoneX = 400;
        this.view.position.x = 0;
        this.view.position.y = 0;
    }
    _drawRect( x, y, width, height ) {
        let rect;
        rect = new PIXI.Graphics();
        rect.beginFill(0, 0);
        rect.drawRect(x, y, this.game.sceneW, this.game.sceneH);
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
    render(){
        this.game.scene.addChild( this.view );
    }
}