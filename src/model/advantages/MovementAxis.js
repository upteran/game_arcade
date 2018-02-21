import Advantage from "./Advantage";

export default class MovementAxis extends Advantage {

    constructor(...arg) {
    	super(...arg);
        this.lastDir = null;
        this.move = null;
        this.dist = null;
        this.step = null;
    }

    action () {

    }

    tick() {
        if(this.move.x) {
            if(this.posX === this.x + this.dist.x){
                this.step = -this.step;
            } else if( this.posX === this.x){
                this.step = Math.abs(this.step);
            }
            this.posX += this.step;
        }
        if(this.move.y) {
            if(this.posY === (this.y - this.height) - this.dist.y){
                this.step = -this.step;
            } else if( this.posY === this.y - this.height){
                this.step = Math.abs(this.step);
            }
            this.posY -= this.step;
        }
    }

}