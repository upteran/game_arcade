import Entity from "./Entity";


export default class Player extends Entity {
    constructor(...arg) {
        super(...arg);
    }

    update() {
        super.update();
    }

    move() {
        // this.body.texture = this.selectTexture('stop1');
        // if(this._model.down){
        //     this.stopTime = 0;
        //     this.body.texture = this.selectTexture('down');
        // } else if(this._model.posY < this._model.posYcurr) {
        //     this.stopTime = 0;
        //     this.body.texture = this.selectTexture('jump');
        // } else if(this._model.vx !== 0 && !this._model.isHited && !this._model.isDemaged) {
        //     this.stopTime = 0;
        //     this.body.texture = this.selectTexture('move');
        // } else if(!this._model.isHited && !this._model.isDemaged){
        //     // this.stopTime++;
        //     if(this.stopTime / 60 > 3) {
        //         this.body.texture = this.selectTexture('stop');
        //     } else {
        //         this.body.texture = this.selectTexture('stop1');
        //     }
        // }
        super.move();

    }
}