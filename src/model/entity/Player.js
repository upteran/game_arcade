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
        let move = this.advantages.filter(({ type }) => type === "Moving");
        let hit = this.advantages.filter(({ type }) => type === "Hit");
        if(actor.type !== 'enemy') {
            move[0].action({event: 'barrier', collision});
        }
        else if(actor.type === 'enemy') {
            switch(side) {
                case 'bottom':
                hit[0].action({event: 'combo'});
                move[0].action({event: 'barrier', collision});
                move[0].action({event: 'jump'});
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