import Entity from "./";


export default class Player extends Entity {
    constructor(...arg) {
        super(...arg)
        this.stopTime = 0;
    }
    update() {
        super.update();
        this.hit();
        this.updateFrameOffsets();
    }
    updateFrameOffsets() {
        this.body.width = this.body.texture.orig.width * this._model.scaleRatio;
        this.body.height = this.body.texture.orig.height * this._model.scaleRatio;
        this.body.position.y = (this._model.posY + this._model.startCharHeight) - this.body.height;
    }
    demage() {
        if(this._model.isDemaged) {
            this.body.texture = this.animations.play('hurt', 400, true);
            if(this.body.alpha !== 0) {
                this.body.alpha -= 1;
                this.body.tint = 0xf2aebc;
            } else {
                this.body.alpha += 1;
                this.body.tint = 0xf2aebc;
            }
        } else {
            this.body.alpha = 1;
            this.body.tint = 0xFFFFFF;
        }
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