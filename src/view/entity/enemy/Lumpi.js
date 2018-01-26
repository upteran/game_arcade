import * as PIXI from 'pixi.js';
import * as utils from './../../../utils'
import Entity from "./../";


export default class Lumpi extends Entity{
    constructor(game, model) {
        super(game, model);
    }
    update() {
        this.body.texture = this.animations.play('move', 100, false);
        super.update();
    }
}