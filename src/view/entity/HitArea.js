import * as PIXI from 'pixi.js';
import animationsTextureLoader from './../../utils/AnimationsTextureLoader.js';
import * as utils from './../../utils';

export default class HitArea {
    constructor(game, model) {
        this.game = game;
        this._model = model;
        // this._container = new PIXI.Container();
        this.body = new PIXI.Graphics();

        this.body.beginFill(0, 0.1);

        // set the line style to have a width of 5 and set the color to red
        this.body.lineStyle(5, 0xFF0000);

        // draw a rectangle
        this.body.drawRect(0, 0, 300, 200);

        this.body.position.x = this._model.posX;
        this.body.position.y = this._model.posY;
        this.body.width = this._model.width;
        this.body.height = this._model.height;
        // this.body.anchor.x = this._model.anchor.x;
    }
    update() {
        this.move();
    }
    move() {
        this.body.position.x = this._model.posX;
        this.body.position.y = this._model.posY;

    }
    render(){
        this.game.scene.addChild( this.body );
    }
}