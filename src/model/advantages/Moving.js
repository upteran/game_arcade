import Advantage from "./Advantage";

export default class Moving extends Advantage {

    constructor(...arg) {
        super(...arg);
        this.entity.dir = null;
        this.entity.currAction = null;
        this.entity.vx = null;
        this.entity.vy = null;
        this.entity.gravity = null;
        this.entity.maxV = null;
        this.entity.step = null;
        this.entity.down = false;
        this.entity.stopJump = false;
        this.entity.isJumping = false;
        this.entity.posYcurr = this.entity.posY;
        this.entity.posStartY = this.entity.posY;
        this.entity.startJump = this.startJump.bind(this);
        this.entity.endJump = this.endJump.bind(this);
    }

    action ( {event} ) {
        console.log( event )
        if( event === 'r') {
            this.entity.dir = 'r';
        } else if ( event === 'l' ) {
            this.entity.dir = 'l';
        } else if ( event === 'down' ) {
            this.entity.dir = 's';
            this.entity.down = true;
        } else if ( event === 'jump' ) {
            this.startJump();
        } else if ( event === 'jumpEnd') {
            this.endJump();
        } else if (event === 's') {
            this.entity.dir = 's';
            this.entity.down = false;
        }
    }

    tick () {

        if( ( this.entity.dir === 'r' || this.entity.dir === 'l') && !this.entity.down && !this.entity.isDemaged) {
            this.entity.lastDir = this.entity.dir;
            if(this.entity.dir === 'r') {
                this.entity.vx += this.entity.ax;
                if(this.entity.vx > this.entity.maxV.x) {
                    this.entity.vx = this.entity.maxV.x;
                }
            } else if(this.entity.dir === 'l'){
                this.entity.vx -= this.entity.ax;
                if(this.entity.vx < -this.entity.maxV.x) {
                    this.entity.vx = -this.entity.maxV.x;
                }
            }

            if(!this.entity.isJumping) {
                this.entity.currAction = 'move';
            }
        }
        else if( this.entity.down ) {
            this.entity.vx = 0;
            this.entity.currAction = 'down';
        }
        else if( this.entity.dir === 's' && !this.entity.isJumping && !this.entity.down && !this.entity.isDemaged) {
            this.entity.currAction = 'stop';
            if(this.entity.vx < 0) {
                this.entity.vx += this.entity.gravity.x;
                if(this.entity.vx >= 0) this.entity.vx = 0;
            } else if(this.entity.vx > 0){
                this.entity.vx -= this.entity.gravity.x;
                if(this.entity.vx <= 0) this.entity.vx = 0;
            }
        }
        if(!this.entity.collision && this.entity.posStartY !== this.posYcurr) {
            this.entity.posYcurr = this.entity.posStartY;
        }
        this.entity.posX += this.entity.vx;
        this.moveY();
    }

    startJump() {
        if(!this.entity.isJumping) {
            this.entity.vy = this.entity.maxV.y;
            this.entity.isJumping = true;
            this.entity.currAction = 'jump';
        }
    }

    endJump () {
        if(this.entity.vy < this.entity.maxV.y / 2) {
            this.entity.vy = this.entity.maxV.y / 2;
        }
    }

    moveY() {
        this.entity.vy += this.entity.gravity.y;
        this.entity.posY += this.entity.vy;
        if(this.entity.vy > 6) this.entity.vy = 6;
        if(this.entity.posY > this.entity.posYcurr) {
            this.entity.posY = this.entity.posYcurr;
            this.entity.isJumping = false;

        } else {
            this.entity.vx = this.entity.vx / 1.09;
        }
    }

}
