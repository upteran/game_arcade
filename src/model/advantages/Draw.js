import Advantage from "./Advantage";

export default class Draw extends Advantage {
    constructor(...arg) {
        super(...arg);
        this.sourceWidth = null;
        this.sourceHeight = null;
        this.scaleRatio = null;
        this.scale = null;
        this.anchor = null;
    }

    init() {
        this.width = this.sourceWidth * this.scaleRatio;
        this.height = this.sourceHeight * this.scaleRatio;
        this.posX = this.x;
        this.posY = this.y - this.height;
        this.posYcurr = this.posY;
        this.posStartY = this.posY;
    }

    tick () {
        if( this.dir === 'l') {
            this.scale.x = -this.scaleRatio;
        }  else if( this.dir === 'r'){
            this.scale.x = this.scaleRatio;
        } 
    }

}