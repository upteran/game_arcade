import Advantage from "./";

export class MovingAxis extends Advantage {
    constructor(entity) {
        super(entity);
        this.dir = null;
        this.lastDir = null;
        this.down = false;
        this.vx = 0;
        this.vy = 0;
    }
    action ( dir ) {
        this.dir = dir;
        this.vx = 5;
        if( dir === 'r') {
            this.lastDir = 'r';
        }
        else if( dir  === 'l') {
            this.lastDir = 'l';
        }
        else if( dir === 'd') {
            this.down = true;
        }
        else {
            this.vx = 0;
        }
    }
}