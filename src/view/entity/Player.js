import Entity from "./";


export default class Player extends Entity {
    constructor(...arg) {
        super(...arg);
        this.stopTime = 0;
    }

    update() {
        super.update();
        this.hit();
        this.updateFrameOffsets();
    }

    hit() {
        if(this._model.isHited && !this._model.down) {
            this.body.texture = this.animations.play('combo', 100, false);
            this.stopTime = 0;
        } else if(this._model.isHited && this._model.down) {
            this.body.texture = this.animations.play('comboDown', 100, false);
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
                this.body.texture = this.animations.play('stop1', 100, false);
            }
        }
        super.move();

    }
}