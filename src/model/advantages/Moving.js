import Advantage from "./Advantage";

export default class Moving extends Advantage {

    constructor(...arg) {
        super(...arg);
        this.dir = null;
        this.vx = null;
        this.vy = null;
        this.gravity = null;
        this.maxV = null;
        this.step = null;
        this.ax = null;
        this.down = false;
        this.stopJump = false;
        this.isJumping = false;
        this.posYcurr = this.entity.y;
        this.posStartY = this.posYcurr;
    }

    action ( {event, collision} ) {
        if( event === 'r') {
            this.dir = 'r';
            this.entity.currAction = 'move';
        } else if ( event === 'l' ) {
            this.dir = 'l';
            this.entity.currAction = 'move';
        } else if ( event === 'down' ) {
            this.dir = 's';
            this.down = true;
            this.entity.currAction = 'down';
        } else if ( event === 'jump' ) {
            this.startJump();
        } else if ( event === 'jumpEnd') {
            this.endJump();
            this.entity.currAction = '';
        } else if (event === 's') {
            this.dir = 's';
            this.down = false;
            this.entity.currAction = 'stop';
        } else if( event === 'barrier' ) {
            switch(collision.side) {
                case 'bottom':
                this.posYcurr = collision.other.y - collision.other.height + 0.1;
                if(this.vy > -2) this.vy = 0;
                break;
                case 'top':
                this.entity.y = collision.other.posY + collision.other.height;
                this.vy = 0;
                break;
                case 'left':
                this.entity.x = collision.other.x - this.entity.width + 1;
                break;
                case 'right':
                this.entity.x = collision.other.x + collision.other.width + 1;
                break;
                default:
                break;
            }
        }
    }

    tick () {

        if( ( this.dir === 'r' || this.dir === 'l') && !this.down && !this.isDemaged) {
            this.entity.lastDir = this.dir;
            if(this.dir === 'r') {
                this.vx += this.ax;
                if(this.vx > this.maxV.x) {
                    this.vx = this.maxV.x;
                    this.entity.currAction = 'run';
                }
            } else if(this.dir === 'l'){
                this.vx -= this.ax;
                if(this.vx < -this.maxV.x) {
                    this.vx = -this.maxV.x;
                    this.entity.currAction = 'run';
                }
            }
        }
        else if( this.down ) {
            this.vx = 0;
            this.entity.currAction = 'down';
        }
        else if( this.dir === 's' && !this.isJumping && !this.down && !this.isDemaged) {
            if(this.vx < 0) {
                this.vx += this.gravity.x;
                if(this.vx >= 0) this.vx = 0;
            } else if(this.vx > 0){
                this.vx -= this.gravity.x;
                if(this.vx <= 0) this.vx = 0;
            }
        }
        if(this.isJumping) {
            this.entity.currAction = 'jump';
        }
        if(!this.entity.collision && this.posStartY !== this.posYcurr) {
            this.posYcurr = this.posStartY;
        }
        this.entity.x += this.vx;
        this.moveY();
    }

    startJump() {
        if(!this.isJumping) {
            this.vy = this.maxV.y;
            this.isJumping = true;
        }
    }

    endJump () {
        if(this.vy < this.maxV.y / 2) {
            this.vy = this.maxV.y / 2;
        }
    }



    moveY() {
        this.vy += this.gravity.y;
        this.entity.y += this.vy;
        if(this.vy > 6) this.vy = 6;
        if(this.entity.y > this.posYcurr) {
            this.entity.y = this.posYcurr;
            if(this.isJumping) {this.entity.currAction = '';}
            this.isJumping = false;
        } else {
            this.vx = this.vx / 1.09;
        }
    }

}
