/*global setTimeout*/
import Entity from './Entity';
// import HitArea from './HitArea';

export default class Player extends Entity {
    constructor(game, props) {
        super(game, props);
    }
    update( dir ){
        super.update( dir );
    }

    // hit( dir ) {
    //     if(this.isJumping) {
    //         return;
    //     } else if(this.vx !== 0) {
    //         this.vx = 0;
    //         this.dir = 's';
    //     }
    //     if( dir ) {
    //         this.currMoveType = 'hit';
    //         this.isHited = dir;
    //     } else {
    //         this.isHited = false;
    //     }
    // }

    touchedAt(collision) {
        let actor = collision.other,
            side = collision.side,
            offset = collision.offset;
        if(actor.type === 'environment' && !this.isHited) {
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
                this.vx = 0;
                break;
                case 'right':
                this.posX = actor.posX + actor.width;
                this.vx = 0;
                break;
                default:
                break;
            }
        }
        // else if(actor.type === 'enemy' && !this.isHited) {
        //     switch(side) {
        //         case 'bottom':
        //         this.posYcurr = actor.posY - this.height;
        //         if(this.vy > -2) this.vy = 0;
        //         break;
        //         case 'top':
        //         this.posY = actor.posY + actor.height;
        //         this.vy = 0;
        //         break;
        //         case 'left':
        //         this.isDemaged = true;
        //         this.posX -= offset * 1.5;
        //         this.demageTime = setTimeout(() => {
        //           this.isDemaged = false;
        //         }, 800);
        //         break;
        //         case 'right':
        //         this.isDemaged = true;
        //         this.posX += offset * 1.5;
        //         this.demageTime = setTimeout(() => {
        //           this.isDemaged = false;
        //         }, 800);
        //         break;
        //         default:
        //         break;
        //     }
        // }
    }
}