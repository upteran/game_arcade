export default class Player {
    constructor(game) {
        this.game = game;
        this.dir = 'r';
        this.type = 'player';
        this.isJumping = false;
        this.maxJumpHeight = 50;
        this.gravity = 0.5;
        this.sourceWidth = 45;
        this.sourceHeight = 50;
        this.scaleRatio = 1.3;
        let MARGIN = 10;
        this.width = (this.sourceWidth - MARGIN) * this.scaleRatio;
        this.height = (this.sourceHeight - MARGIN) * this.scaleRatio;
        this.startCharHeight = this.height;
        this.posX = this.game.playerStartX;
        this.posY = this.game.playerStartY - this.height;
        this.posGameStartX = this.posY;
        this.posYcurr= this.posY;
        this.scaleX = this.scaleRatio;
        this.scaleY = this.scaleRatio;
        this.down = false;
        this.vx = 0;
        this.vy = 0;
        this.obtacleAt = null;
    }
    move( dir ) {
        this.dir = dir;
        this.down = false;
        let collision = this.game.actorTouched(this);
        this.vx = 5;
        if( dir === 'r' ) {
            this.scaleX = this.scaleRatio;
            this.vx = this.vx;
        } else if ( dir === 'l' ) {
            this.scaleX = -this.scaleRatio;
            this.vx = -this.vx;
        } else if( dir === 'd'){
            this.down = true;
        } else {
            this.vx = 0;
        }
        if(collision) {
            this.touchedAt(collision);
        } else {
            this.posYcurr = this.posGameStartX;
        }
        this.downCheck();
        this.jump(collision);
        this.posX += this.vx;

    }
    touchedAt(collision) {
        let actor = collision.other,
            side = collision.side,
            offset = collision.offset;
        if(actor.type === 'box') {
            switch(side) {
                case 'bottom':
                this.posYcurr = actor.posY - this.height + 0.1;
                break;
                case 'top':
                this.posY = actor.posY + actor.height;
                this.vy = 0;
                break;
                case 'left':
                this.posX -= offset;
                break;
                case 'right':
                // this.vx = -this.vx;
                this.posX += offset;
                break;
                default:
                break;
            }
        }
    }
    startJump(){
        if(!this.isJumping) {
            this.vy = -10;
            this.isJumping = true;
        }
    }
    jump(collision) {
        this.vy += this.gravity;
        this.posY += this.vy;
        if(this.vy > 8) this.vy = 8;
        if(this.posY > this.posYcurr) {
            this.posY = this.posYcurr;
            this.isJumping = false;
        }
    }
    jumpEnd() {
        if(this.vy < -5){
            this.vy = -5;
        }

    }
    downCheck(){
        if(this.down) {
            this.height -= 40;
            this.vx = 0;
        } else {
            this.height = this.startCharHeight;
        }
    }
}