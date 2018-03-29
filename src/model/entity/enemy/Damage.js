import Entity from './../Entity';

export default class Damage extends Damage {
    constructor() {
        super();
    }

    update() {
        super.update();
        let collision = this.game.actorTouched(this);
        if(collision) {
            this.collision = true;
            this.touchedAt(collision);
        } else {
            this.collision = false;
        }
    }

    touchedAt(collision){
        let actor = collision.other,
            side = collision.side,
            offset = collision.offset,
            hitDelay = 0,
            hitTime,
            endHitTime,
            attackedTime;
        if(actor.type !== 'player') {
            let move = this.advantages.find(({ type }) => type === "Moving");
            move.action({event: 'barrier', collision});
        }
        if( actor.type === 'player' ) {
            clearTimeout(hitTime);
            clearTimeout(endHitTime);
            clearTimeout(attackedTime);
            switch(side) {
                case 'left':
                this.isAttack = true;
                hitDelay = 0;
                if(this.lastDir === 'l') {
                    this.controller.action({event: 'move', dir: 'r', activeTime: 200 });
                    hitDelay = 250;
                }
                hitTime = setTimeout(() => {
                  this.controller.action({event: 'hit'});
                }, hitDelay)
                endHitTime = setTimeout(() => {
                        this.controller.action({event: 'endHit'});
                        this.isAttack = false;

                    }, 1400)
                actor.x += 15;
                break;
                case 'right':
                this.isAttack = true;
                hitDelay = 0;
                if(this.lastDir === 'r') {
                    this.controller.action({event: 'move', dir: 'l', activeTime: 200 });
                    hitDelay = 250;
                }
                hitTime = setTimeout(() => {
                  this.controller.action({event: 'hit'});
                }, hitDelay)
                endHitTime = setTimeout(() => {
                        this.controller.action({event: 'endHit'});
                        this.isAttack = false;
                    }, 1400)
                actor.x -= 15;
                break;
                case 'top':
                this.controller.action({event: 'stop'});
                break;
                default:
                break;
            }
        }
    }

}