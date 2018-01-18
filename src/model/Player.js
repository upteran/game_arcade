export default class Player {
    constructor(game) {
        this.game = game;
        this.dir = 'r';
        this.type = 'player';
        this.isJumping = false;
        this.maxJumpHeight = 50;
        this.gravity = 0;
        this.posX = this.game.playerStartX;
        this.posY = this.game.playerStartY;
        this.sourceWidth = 45;
        this.sourceHeight = 50;
        this.scaleRatio = 1.3;
        this.width = this.sourceWidth * this.scaleRatio;
        this.height = this.sourceHeight * this.scaleRatio;
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
        // this.scaleY = 1.4;
        this.down = false;
        let collision = this.game.actorTouched(this);
        if(collision) {
            console.log(this.vx);
            this.posX += -this.vx;
            this.vx = 0;
            } else {
                if( dir === 'r' ) {
                    this.scaleX = this.scaleRatio;
                    this.vx = 5;
                } else if ( dir === 'l' ) {
                    this.scaleX = -this.scaleRatio;
                    this.vx = -5;
                } else if( dir === 'd'){
                    this.down = true;
                    this.vx = 0;
                } else {
                    this.vx = 0;
                }
                this.posX += this.vx;
        }
        console.log(this.posX);

    }
    touchedAt() {}
    startJump(){
        this.gravity = 0.5;
        if(!this.isJumping) {
            this.posYcurr = this.posY;
            this.vy = -10;
            this.isJumping = true;
        }
    }
    jump() {
        this.vy += this.gravity;
        this.posY += this.vy;
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
    down(){}
}