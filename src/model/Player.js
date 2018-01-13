export default class Player {
    constructor(game) {
        this.game = game;
        this.dir = 'r';
        this.isJumping = false;
        this.maxJumpHeight = 50;
        this.gravity = 0.5;
        this.posX = this.game.playerStartX;
        this.posY = this.game.playerStartY;
        this.posYcurr= this.posY;
        this.scaleX = 0.5;
        this.scaleY = 0.5;
        this.vx = 0;
        this.vy = 0;
    }
    move( dir ) {
        this.scaleY = 0.5;
        if ( dir == 'r' ) {
            this.scaleX = 0.5;
            this.vx = 5;
        } else if ( dir == 'l' ) {
            this.scaleX = -0.5;
            this.vx = -5;
        } else {
            this.vx = 0;
        }
        this.posX += this.vx;

    }
    startJump(){
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
    moveBottom(){}
}