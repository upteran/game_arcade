import * as PIXI from 'pixi.js';

export default class Camera {
    constructor(game, player, stage) {
        this.game = game;
        this.stage = stage;
        this.target = player.body;
        this.viewportW = this.game.sceneW;
        this.viewportH = this.game.sceneH;
        this.view = this._drawRect(0, 0, this.game.sceneW, this.game.sceneH);
        this.deadzoneX = this.game.sceneW / 4;
        this.view.position.x = 0;
        this.view.position.y = 0;
    }

    _drawRect( x, y, width, height ) {
        let rect;
        rect = new PIXI.Graphics();
        rect.beginFill(0, 0);
        rect.drawRect(x, y, width, height);
        rect.endFill();
        return rect;
    }

    update(){
        if((this.target.position.x) - this.view.position.x + this.deadzoneX > this.viewportW ) {
            const scrolledPos = this.target.position.x + this.deadzoneX - this.viewportW;
            if(this.target.position.x + this.deadzoneX < 3328) {
                this.view.position.x = scrolledPos;
                this.stage.moveRight();
            }
        } else if (this.target.position.x - this.deadzoneX < this.view.position.x ) {
            const scrolledPos = this.target.position.x - this.deadzoneX;
            if(scrolledPos > 0) {
                this.view.position.x = scrolledPos;
                this.stage.moveLeft();
            }
        }
        this.game.scene.pivot.x = this.view.position.x;
        this.game.scene.pivot.y = this.view.position.y;
    }


    render(){
        this.game.scene.addChild( this.view );
    }
}