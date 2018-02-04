import Advantage from "./Advantage";

export default class Physical extends Advantage {
    constructor(entity, props) {
        super(entity);
        this.type = 'Physical';
        this.scaleRatio = props.scale;
        this.sourceWidth = props.width;
        this.sourceHeight = props.height;
        this.entity.width = this.sourceWidth * this.scaleRatio;
        this.entity.height = this.sourceHeight * this.scaleRatio;
        this.entity.scaleX = this.scaleRatio;
        this.entity.posX = this.entity.x;
        this.entity.posY = this.entity.y - this.entity.height;
        this.entity.posYcurr = this.entity.posY;
        this.entity.posStartY = this.entity.posY;
        this.entity.anchor = props.anchor;
        this.entity.moveType = props.moveType;
    }
    action ( dir ) {
        if( dir === 'l') {
            this.entity.scaleX = -this.scaleRatio;
        }  else if( dir === 'r'){
            this.entity.scaleX = this.scaleRatio;
        }
    }

}