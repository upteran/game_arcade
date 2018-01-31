/*global setTimeout*/
import Entity from './Entity';
// import HitArea from './HitArea';

export default class Player extends Entity {
    constructor(game, props) {
        super(game, props);
        this.isJumping = false;
        this.down = false;
        this.isHited = false;
        this.currMoveType = 'stop';
        this.lastDir = this.dir;
        this.isDemaged = false;
        this.hitType = 'stop';
        this.demageTime = null;
        // this.hitArea = new HitArea(this.game, this);
    }
    update( dir ){
        super.update( dir );
        // this.hitArea.update( this );
        this.move( dir );
    }
    move( dir ) {
        this.dir = dir;
        this.down = false;
        if(!this.isHited) this.vx = 5;
        if( dir === 'r' && !this.isDemaged) {
            this.scaleX = this.scaleRatio;
            this.currMoveType = 'move';
            this.lastDir = 'r';
        } else if ( dir === 'l' && !this.isDemaged) {
            this.scaleX = -this.scaleRatio;
            this.vx = -this.vx;
            this.lastDir = 'l';
            this.currMoveType = 'move';
        } else if( dir === 'd'){
            this.down = true;
            this.currMoveType = 'down';
        } else {
            this.vx = 0;
        }
        this.posYcurr = this.posGameStartY;
        this.downCheck();
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
        } else {
            this.isHited = false;
        }
    }

    touchedAt(collision) {
        let actor = collision.other,
            side = collision.side,
            offset = collision.offset;
        if(actor.type === 'box' && !this.isHited) {
            switch(side) {
                case 'bottom':
                this.posYcurr = actor.posY - this.height;
                if(this.vy > -2) this.vy = 0;
                break;
                case 'top':
                this.posY = actor.posY + actor.height;
                this.vy = 0;
                break;
                case 'left':
                this.posX = actor.posX - this.width;
                break;
                case 'right':
                this.posX = actor.posX + actor.height;
                break;
                default:
                break;
            }
        }
        if(actor.type === 'enemy' && !this.isHited) {
            switch(side) {
                case 'bottom':
                this.posYcurr = actor.posY - this.height;
                if(this.vy > -2) this.vy = 0;
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
                }, 800);
                break;
                case 'right':
                this.isDemaged = true;
                this.posX += offset * 1.5;
                this.demageTime = setTimeout(() => {
                  this.isDemaged = false;
                }, 800);
                break;
                default:
                break;
            }
        }
    }
    downCheck(){
        if(this.down) {
            this.vx = 0;
        } else {

        }
    }
}