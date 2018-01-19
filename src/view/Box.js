import * as PIXI from 'pixi.js';
//x: 800 , y: 337;
export default class Box {
    constructor(game, model) {
        this.game = game;
        this._model = model;
        this._container = new PIXI.Container();
        this.bodyTexture = PIXI.Texture.fromFrame('box');
        this.body = new PIXI.Sprite(this.bodyTexture);
        this.body.position.x = this._model.posX;
        this.body.position.y = this._model.posY;
        this.body.width = this._model.width;
        this.body.height = this._model.height;
        this._container.addChild( this.body );
    }
    move() {
        this.body.position.x = this._model.posX;
    }
    update(){
        this.move();
    }
    render(){
        this.game.scene.addChild( this._container );
    }
}