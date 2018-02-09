import Advantage from "./Advantage";

export default class Draw extends Advantage {
    constructor(...arg) {
        super(...arg);
        this.entity.sourceWidth = null;
        this.entity.sourceHeight = null;
        this.entity.scaleRatio = null;
        this.entity.scale = null;
        this.entity.anchor = null;
    }

    init() {
        this.entity.width = this.entity.sourceWidth * this.entity.scaleRatio;
        this.entity.height = this.entity.sourceHeight * this.entity.scaleRatio;
        this.entity.posX = this.entity.x;
        this.entity.posY = this.entity.y - this.entity.height;
        this.entity.posYcurr = this.entity.posY;
        this.entity.posStartY = this.entity.posY;
    }

    action ( dir ) {
        if( this.entity.dir === 'l') {
            this.entity.scale.x = -this.entity.scaleRatio;
        }  else if( this.entity.dir === 'r'){
            this.entity.scale.x = this.entity.scaleRatio;
        }
    }

}