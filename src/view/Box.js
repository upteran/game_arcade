import * as PIXI from 'pixi.js';
//x: 800 , y: 337;
export default class Box {
    constructor(game, model) {
        this.game = game;
        this._model = model;
        this.posX = this._model.posX;
        this.posY = this._model.posY;
        this.h = this._model.height;
        this.w = this._model.width;
        this.rect = new PIXI.Graphics();
        this.rect.beginFill(0, 1);
        this.rect.drawRect(this.posX, this.posY, this.w, this.h);
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