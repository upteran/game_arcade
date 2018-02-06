import Advantage from "./Advantage";

export default class MovementAxis extends Advantage {
    constructor(entity, props) {
    	super(entity)
        this.type = 'MovementAxis';
        this.entity.lastDir = null;
        this.currDir = this.entity.dir;
        this.moveAxisX = props.move.x;
        this.moveAxisY = props.move.y;
        this.distX = props.dist.x;
        this.distY = props.dist.y;
        this.step = props.step;
    }

    action () {
        if(this.moveAxisX) {
            if(this.entity.posX === this.entity.x + this.distX){
                this.step = -this.step;
                this.entity.scaleX = -this.entity.scaleX;
            } else if( this.entity.posX === this.entity.x){
                this.step = Math.abs(this.step);
                this.entity.scaleX  = Math.abs(this.entity.scaleX );
            }
            this.entity.posX += this.step;
        }
        if(this.moveAxisY) {
            if(this.entity.posY === (this.entity.y - this.entity.height) - this.distY){
                this.step = -this.step;
            } else if( this.entity.posY === this.entity.y - this.entity.height){
                this.step = Math.abs(this.step);
            }
            this.entity.posY -= this.step;
        }
    }

}