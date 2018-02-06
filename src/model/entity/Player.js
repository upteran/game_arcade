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

    touchedAt(collision) {
        let actor = collision.other,
            side = collision.side,
            offset = collision.offset;
        if(actor.type !== 'enemy') {
            switch(side) {
                case 'bottom':
                this.posYcurr = actor.posY - this.height + 0.1;
                if(this.vy > -2) this.vy = 0;
                break;
                case 'top':
                this.vy = 1;
                break;
                case 'left':
                this.posX = actor.posX - this.width + 1;
                // this.dir = 's';
                // this.vx = 0;
                break;
                case 'right':
                this.posX = actor.posX + actor.width + 1;
                // this.dir = 's';
                // this.vx = 0;
                break;
                default:
                break;
            }
        }
        else if(actor.type === 'enemy') {
            switch(side) {
                case 'bottom':
                this.hit(true)
                this.posYcurr = actor.posY - this.height;
                this.startJump();
                break;
                case 'top':
                this.posY = actor.posY + actor.height;
                this.vy = 0;
                break;
                case 'left':
                // this.clearHit();
                // this.isDemaged = true;
                // this.dir = 'h';
                // this.posX -= offset * 1.2;
                // this.vx = 0;
                // this.endHit();
                break;
                case 'right':
                // this.clearHit();
                // this.isDemaged = true;
                // this.dir = 'h';
                // this.posX += offset * 1.2;
                // this.vx = 0;
                // this.endHit();
                break;
                default:
                break;
            }
        }
    }
}