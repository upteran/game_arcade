import Advantage from "./";

export class Render extends Advantage {
    constructor(entity) {
        super(entity);
        this.scaleRatio = props.scale;
        this.sourceWidth = props.width;
        this.sourceHeight = props.height;
        this.width = this.sourceWidth * this.scaleRatio;
        this.height = this.sourceHeight * this.scaleRatio;
        this.posX = props.x;
        this.posY = props.y - this.height;
    }
    action ( dir ) {
    }
}