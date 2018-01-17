import * as PIXI from 'pixi.js';

export default class Box {
    constructor(game) {
        this.game = game;
        this.rect = new PIXI.Graphics();
        this.rect.beginFill(0, 1);
        this.rect.drawRect(800, 337, 50, 50);
        this.rect.endFill();
        // this._container.addChild( this.body );
    }
    _drawRect( x, y, width, height ) {
        let rect;
        rect = new PIXI.Graphics();
        rect.beginFill(0, 0);
        rect.drawRect(x, y, this.game.sceneW, this.game.sceneH);
        rect.endFill();
        return rect;
    }
    render(){
        this.game.scene.addChild( this.rect );
    }
}