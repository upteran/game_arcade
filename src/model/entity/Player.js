import Entity from './Entity';

export default class Player extends Entity {

    constructor(...arg) {
        super(...arg);
        this.lastCollision = null;
    }

    update(){
        super.update();
        let collision = this.game.actorTouched(this);
        if(collision) {
            this.collision = true;
            this.touchedAt(collision);
        } else {
            this.collision = false;
        }
    }

    touchedAt(collision) {
        let actor = collision.other,
            side = collision.side,
            offset = collision.offset,
            hitTime;
        let move = this.advantages.filter(({ type }) => type === "Moving");
        let hit = this.advantages.filter(({ type }) => type === "Hit");
        if(actor.type !== 'enemy') {
            move[0].action({event: 'barrier', collision});
        }
        else if(actor.type === 'enemy' || actor.type === 'hit') {
            clearTimeout(hitTime);
            switch(side) {
                case 'bottom':
                hit[0].action({event: 'hit'});
                hitTime = setTimeout(() => {
                    move[0].action({event: 'jump'});
                    move[0].action({event: 'barrier', collision});
                    hit[0].action({event: 'endHit'});
                }, 20)
                break;
                case 'top':
                // this.y = actor.posY + actor.height;
                // this.vy = 0;
                break;
                default:
                break;
            }
        }
    }

}