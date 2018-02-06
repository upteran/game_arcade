import Advantage from "./Advantage";

export default class Draw extends Advantage {
    constructor(entity, props) {
        super(entity);
        this.type = 'Draw';
        this.entity.scaleRatio = props.scale;
        this.sourceWidth = props.width;
        this.sourceHeight = props.height;
        this.entity.width = this.sourceWidth * this.entity.scaleRatio;
        this.entity.height = this.sourceHeight * this.entity.scaleRatio;
        this.entity.scaleX = this.entity.scaleRatio;
        this.entity.posX = this.entity.x;
        this.entity.posY = this.entity.y - this.entity.height;
        this.entity.posYcurr = this.entity.posY;
        this.entity.posStartY = this.entity.posY;
        this.entity.anchor = props.anchor;
        this.entity.moveType = props.moveType;
    }

    action ( dir ) {
        if( this.entity.dir === 'l') {
            this.entity.scaleX = -this.entity.scaleRatio;
        }  else if( this.entity.dir === 'r'){
            this.entity.scaleX = this.entity.scaleRatio;
        }
    }

}