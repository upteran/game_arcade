import Advantage from "./Advantage";

export default class MovementAxis extends Advantage {
    constructor(...arg) {
    	super(...arg)
        this.entity.lastDir = null;
        this.entity.move = null;
        this.entity.dist = null;
        this.entity.step = null;
    }

    action () {
        if(this.entity.move.x) {
            if(this.entity.posX === this.entity.x + this.entity.dist.x){
                this.entity.step = -this.entity.step;
            } else if( this.entity.posX === this.entity.x){
                this.entity.step = Math.abs(this.entity.step);
            }
            this.entity.posX += this.entity.step;
        }
        if(this.entity.move.y) {
            if(this.entity.posY === (this.entity.y - this.entity.height) - this.entity.dist.y){
                this.entity.step = -this.entity.step;
            } else if( this.entity.posY === this.entity.y - this.entity.height){
                this.entity.step = Math.abs(this.entity.step);
            }
            this.entity.posY -= this.entity.step;
        }
    }

}