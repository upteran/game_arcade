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

        // this.entity.gravity.x = 4;
        // this.entity.vxo = 0.06;
    }

    tick () {
        this.action();
    }

    // action () {
    //     if( ( this.entity.dir === 'r' || this.entity.dir === 'l') && !this.entity.down && !this.entity.isDemaged) {
    //         this.entity.lastDir = this.entity.dir;
    //         this.entity.vxo = (this.entity.dir === 'r') ? (this.entity.step) : (-this.entity.step);
    //         this.entity.ax = (this.entity.dir === 'r') ? 0.1 : -0.1;
    //         if(!this.entity.isJumping) {
    //             this.entity.currAction = 'move';
    //         }
    //     }
    //     else if( this.entity.down && this.entity.dir === 's' && !this.entity.isDemaged) {
    //         this.entity.down = true;
    //         this.entity.vxo = 0;
    //         this.entity.currAction = 'down';
    //     }
    //     else if( this.entity.dir === 's' && !this.entity.isJumping && !this.entity.down && !this.entity.isDemaged) {
    //         this.entity.currAction = 'stop';
    //         // this.entity.lastDir = this.entity.dir;
    //         this.entity.vx = 0;
    //         this.entity.vxo = 0;
    //     }
    //     if(!this.entity.collision && this.entity.posStartY !== this.posYcurr) {
    //         this.entity.posYcurr = this.entity.posStartY;
    //     }
    //     this.entity.vx += this.entity.vxo + this.entity.ax;
    //     if(this.entity.vx > this.entity.maxV.x) this.entity.vx = this.entity.maxV.x;
    //     this.entity.posX += this.entity.vx;
    //     this.moveY();
    // }

    action () {
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
        else if( this.entity.down && this.entity.dir === 's' && !this.entity.isDemaged) {
            this.entity.down = true;
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
        if(this.entity.vy > 8) this.entity.vy = 8;
        if(this.entity.posY > this.entity.posYcurr) {
            this.entity.posY = this.entity.posYcurr;
            this.entity.isJumping = false;

        } else {
            this.entity.vx = this.entity.vx / 1.09;
        }
    }

}
