import Entity from './../Entity';
import EnemyController from './../../../controller/EnemyController';

export default class Enemy extends Entity {
    constructor(...arg) {
        super(...arg);
        this.controller = new EnemyController(this);
        this.lastDir = 'r';
        this.timeWalk = null;
        this.isAttack = false;
        this.hitTime = 0;

    }

    update() {
        super.update();
        if(!this.isDemaged && !this.isAttack) {
            if(this.timeWalk <= 100 && this.timeWalk >= 0) {
                this.controller.action({event: 'move', dir: 'r'});
                this.timeWalk++;
            }

            if(this.timeWalk > 100 && this.timeWalk <= 200) {
                this.controller.action({event: 'stop'});
                this.timeWalk++;
            }

            if(this.timeWalk > 200 && this.timeWalk <= 300) {
                this.controller.action({event: 'move', dir: 'l'});
                this.timeWalk++;
            }

            if(this.timeWalk > 300 && this.timeWalk < 400) {
                this.controller.action({event: 'stop'});
                this.timeWalk++;
            }

            if(this.timeWalk >= 400) {
                this.timeWalk = 0;
            }
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