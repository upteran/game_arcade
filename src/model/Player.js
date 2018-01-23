/*global setTimeout*/
export default class Player {

    static Create(game, props) {
        const res = new Player(game);
        res.props.push(props);
    }

    constructor(game) {

        this.props = [];


        this.game = game;
        this.dir = 'r';
        this.type = 'player';
        this.isJumping = false;
        this.gravity = 0.5;
        this.sourceWidth = 45;
        this.sourceHeight = 60;
        this.scaleRatio = 1.3;
        let MARGIN = 15;
        this.width = (this.sourceWidth - MARGIN) * this.scaleRatio;
        this.height = this.sourceHeight * this.scaleRatio;
        this.hitWidth = this.width + 40;
        this.startCharWidth = this.width;
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
        this.isHited = false;
        this.currMoveType = 'stop';
        this.isDemaged = false;
        this.hitType = 'stop';
        this.demageTime = null;
    }
    move( dir ) {
        this.dir = dir;
        this.down = false;
        let collision = this.game.actorTouched(this);
        if(!this.isHited) this.vx = 5;
        if( dir === 'r' && !this.isDemaged) {
            this.scaleX = this.scaleRatio;
            this.vx = this.vx;
            this.currMoveType = 'move';
        } else if ( dir === 'l' && !this.isDemaged) {
            this.scaleX = -this.scaleRatio;
            this.vx = -this.vx;
            this.currMoveType = 'move';
        } else if( dir === 'd' && !this.isHited){
            this.down = true;
            this.currMoveType = 'down';
            // this.posY = this.game.playerStartY;
        } else {
            this.vx = 0;
        }
        if(collision) {
            this.touchedAt(collision);
        } else {
            this.posYcurr = this.posGameStartX;
        }
        this.downCheck();
        this.moveY();
        this.posX += this.vx;

    }
    hit( dir ) {
        if(this.isJumping) {
            return;
        } else if(this.vx !== 0) {
            this.vx = 0;
            this.dir = 's';
        }
        if( dir ) {
            this.currMoveType = 'hit';
            this.isHited = dir;
            this.width = this.hitWidth;
        } else {
            this.isHited = false;
            this.width = this.startCharWidth;
        }
    }
    touchedAt(collision) {
        let actor = collision.other,
            side = collision.side,
            offset = collision.offset;
        if(actor.type === 'box' && !this.isHited) {
            switch(side) {
                case 'bottom':
                this.posYcurr = actor.posY - this.startCharHeight + 0.1;
                break;
                case 'top':
                this.posY = actor.posY + actor.height;
                this.vy = 0;
                break;
                case 'left':
                this.posX -= offset;
                break;
                case 'right':
                this.posX += offset;
                break;
                default:
                break;
            }
        }
        if(actor.type === 'enemy') {
            switch(side) {
                case 'bottom':
                this.posYcurr = actor.posY - this.startCharHeight + 0.1;
                break;
                case 'top':
                this.posY = actor.posY + actor.height;
                this.vy = 0;
                break;
                case 'left':
                this.isDemaged = true;
                this.posX -= offset * 1.5;
                this.demageTime = setTimeout(() => {
                  this.isDemaged = false;
                }, 800)
                break;
                case 'right':
                this.isDemaged = true;
                this.posX += offset * 1.5;
                this.demageTime = setTimeout(() => {
                  this.isDemaged = false;
                }, 800)
                break;
                default:
                break;
            }
        }
    }
    startJump(){
        if(!this.isJumping && !this.isHited) {
            this.vy = -10;
            this.isJumping = true;
        }
    }
    moveY() {
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
            this.vx = 0;
        } else {

        }
    }
}