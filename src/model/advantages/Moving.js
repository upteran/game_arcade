import Advantage from "./Advantage";

export default class Moving extends Advantage {
    constructor(entity, props) {
        super(entity);
        this.type = 'Moving';
        this.entity.dir = props.dir;
        this.entity.lastDir = this.entity.dir;
        this.entity.down = false;
        this.entity.vx = 5;
        this.step = props.step || 4;
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

    tick () {
        this.action();
    }

    action () {
        if( ( this.entity.dir === 'r' || this.entity.dir === 'l') && !this.entity.down && !this.entity.isDemaged) {
            this.entity.lastDir = this.entity.dir;
            this.entity.vx = (this.entity.dir === 'r') ? (this.step) : (-this.step);
            if(!this.entity.isJumping) {
                this.entity.currAction = 'move';
            }
        }
        else if( this.entity.down && this.entity.dir === 's' && !this.entity.isDemaged) {
            this.entity.down = true;
            this.entity.vx = 0;
            this.entity.currAction = 'down';
        }
        else if( this.entity.dir === 's' && !this.entity.isJumping && !this.entity.down && !this.entity.isDemaged) {
            this.entity.currAction = 'stop';
            this.entity.vx = 0;
        }
        if(!this.entity.collision && this.entity.posStartY !== this.posYcurr) {
            this.entity.posYcurr = this.entity.posStartY;
        } 
        this.entity.posX += this.entity.vx;
        this.moveY();
    }

    startJump() {
        if(!this.entity.isJumping) {
            this.entity.vy = this.maxVy;
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

        } else {
            this.entity.vx = 0;
        }
    }

}
