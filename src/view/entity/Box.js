import * as PIXI from 'pixi.js';
import Entity from "./";
//x: 800 , y: 337;
export default class Box extends Entity{
    constructor(game, model) {
        super(game, model);
    }
    update(){
        this.body.texture = this.animations.play('normal', 100, false);
        super.update();
    }
    demage(){
        // if(this._model.health < 50 && this._model.health > 30) {
        //     this.body.gotoAndStop(1);
        // } else if(this._model.health < 30){
        //     this.body.gotoAndStop(2);
        // }
    }
}