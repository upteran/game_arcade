import Advantage from "./Advantage";

export default class MovingAxis extends Advantage {
    constructor(entity, props) {
        super(entity);
        this.type = 'MovingAxis';
        this.entity.scaleRatio = props.scale;
        this.entity.scaleX = this.entity.scaleRatio;
        this.entity.height = props.height * this.entity.scaleRatio;
        this.entity.width = props.width * this.entity.scaleRatio;
        this.entity.posX = this.entity.x;
        this.entity.posY = this.entity.y - props.height;
        this.entity.dir = 'r';
        this.entity.lastDir = null;
        this.entity.down = false;
        this.entity.vx = 0;
        this.entity.vy = 0;
    }

    tick ( dir ) {
        console.log('Hello tick')
        super.tick( dir );
    }

    action ( dir ) {
        this.dir = dir;
        this.vx = 5;
        if( dir === 'r') {
            this.lastDir = 'r';
        }
        else if( dir  === 'l') {
            this.lastDir = 'l';
            this.scaleX = -this.scaleRatio;
        }
        else if( dir === 'd') {
            this.down = true;
        }
        else {
            this.vx = 0;
        }
        this.entity.x += this.vx;
    }


}
