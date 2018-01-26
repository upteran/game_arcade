import * as PIXI from 'pixi.js';
import Entity from "./";


export default class Player extends Entity {
    constructor(...arg) {
        super(...arg)
        this.stopTime = 0;
    }
    update() {
        super.update();
        // this.hit();
    }
    demage() {
        if(this._model.isDemaged) {
            this.body.texture = this.animations.play('hurt', 400, true);
        }
    }
    hit() {
        if(this._model.isHited) {
            this.body.texture = this.animations.play('sword_combo_1', 200, false);
            this.body.width = 82 * this._model.scaleRatio;
            this.body.height = 61 * this._model.scaleRatio;
            this.stopTime = 0;
        }
    }
    move() {
        // this.body.texture = this.animations.play('move', 300, false);
        if(this._model.down){
            this.stopTime = 0;
            this.body.texture = this.animations.play('down', 60, true);
        } else if(this._model.isJumping) {
            this.stopTime = 0;
            this.body.texture = this.animations.play('jump', 600, false);
        } else if(this._model.vx !== 0 && !this._model.isHited && !this._model.isDemaged) {
            this.stopTime = 0;
            this.body.texture = this.animations.play('move', 60, false);
        } else if(!this._model.isHited && !this._model.isDemaged){
            this.stopTime++;
            if(this.stopTime / 60 > 3) {
                this.body.texture = this.animations.play('stop', 320, true);
            } else {
                this.body.texture = this.animations.play('stop1', 600, false);
            }
        }
        super.move();

    }
}