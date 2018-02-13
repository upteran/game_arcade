import Entity from './Entity';

export default class Player extends Entity {

    constructor(...arg) {
        super(...arg);
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
                this.vy = 3;
                break;
                case 'left':
                this.posX = actor.posX - this.width + 1;
                break;
                case 'right':
                this.posX = actor.posX + actor.width + 1;
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
                // case 'left':
                // break;
                // case 'right':
                // break;
                default:
                break;
            }
        }
    }

}