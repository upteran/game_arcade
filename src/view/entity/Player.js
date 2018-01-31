import Entity from "./Entity";


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
            this.body.texture = this.selectTexture('combo');
            this.stopTime = 0;
        } else if(this._model.isHited && this._model.down) {
            this.body.texture = this.selectTexture('comboDown');
            this.stopTime = 0;
        }
    }

    move() {
        // this.body.texture = this.animations.play('move', 300, false);
        if(this._model.down){
            this.stopTime = 0;
            this.body.texture = this.selectTexture('down');
        } else if(this._model.isJumping) {
            this.stopTime = 0;
            this.body.texture = this.selectTexture('jump');
        } else if(this._model.vx !== 0 && !this._model.isHited && !this._model.isDemaged) {
            this.stopTime = 0;
            this.body.texture = this.selectTexture('move');
        } else if(!this._model.isHited && !this._model.isDemaged){
            // this.stopTime++;
            if(this.stopTime / 60 > 3) {
                this.body.texture = this.selectTexture('stop');
            } else {
                this.body.texture = this.selectTexture('stop1');
            }
        }
        super.move();

    }
}