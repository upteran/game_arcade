import Entity from "./Entity";
//x: 800 , y: 337;
export default class Box extends Entity{
    constructor(...arg) {
        super(...arg);
    }
    update(){
        this.body.texture = this.textures['normal'][Math.floor(new Date().valueOf() / this.FRAME_TIME) % this.textures['normal'].length];
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