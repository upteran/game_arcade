import Advantage from "./Advantage";

export default class Moving extends Advantage {
    constructor(entity, props) {
        super(entity);
        this.type = 'Moving';
        this.entity.dir = 'r';
        this.entity.lastDir = null;
        this.entity.down = false;
        this.entity.vx = 5;
        this.step = props.step || 5;
        this.entity.vy = this.step;
        this.entity.stopJump = false;
        this.gravity = props.gravity || 0.5;
        this.maxVy = props.maxVy || -10;
        this.entity.isJumping = false;
        this.entity.posYcurr = this.entity.posY; 
        this.entity.posStartY = this.entity.posY; 
        this.entity.currAction = props.currAction || 'default';
        this.entity.startJump = this.startJump.bind(this);
        this.entity.endJump = this.endJump.bind(this);
    }

    tick ( dir ) {
        this.action(dir);
    }

    action ( dir ) {
        this.entity.dir = dir;
        this.entity.down = false;
        this.entity.vx = 0;
        if( dir === 'r' && !this.entity.down && this.entity.posY >= this.entity.posYcurr) {
            this.entity.lastDir = 'r';
            this.entity.vx = this.step;
            this.entity.currAction = 'move';
        }
        else if( dir  === 'l' && !this.entity.down && this.entity.posY >= this.entity.posYcurr) {
            this.entity.lastDir = 'l';
            this.entity.vx = -this.step;
            this.entity.currAction = 'move';
            
        }
        else if( dir === 'd') {
            this.entity.down = true;
            this.entity.vx = 0;
            this.entity.currAction = 'down';
        }
        if(!this.entity.isJumping && this.entity.posY >= this.entity.posYcurr) {
            this.entity.currAction = 'stop';
        }
        if(this.entity.vx !== 0 && this.entity.posY >= this.entity.posYcurr) {
            this.entity.currAction = 'move';
        }
        if(!this.entity.collision && this.entity.posStartY !== this.posYcurr) {
            this.entity.posYcurr = this.entity.posStartY;
        } 
        this.entity.posX += this.entity.vx;
        this.moveY();
    }

    startJump() {
        if(!this.entity.isJumping) {
            this.entity.vy = this.maxVy || -10;
            this.entity.isJumping = true;
            this.entity.currAction = 'jump';
        }
    }

    endJump () {
        if(this.entity.vy < this.maxVy / 2) {
            this.entity.vy = this.maxVy / 2;
        }
    } 

    moveY() {
        this.entity.vy += this.gravity;
        this.entity.posY += this.entity.vy;
        if(this.entity.vy > 8) this.entity.vy = 8;
        if(this.entity.posY > this.entity.posYcurr) {
            this.entity.posY = this.entity.posYcurr;
            this.entity.isJumping = false;

        }
    }

}
