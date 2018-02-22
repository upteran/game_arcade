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
        let vitality = this.advantages.find(({ type }) => type === 'Vitality');
        if(this.name === 'bigZombi_01') {
            // console.log(vitality.isDemaged)
        }
        // if(!vitality.isDemaged && !this.isAttack) {
        //     if(this.name === 'bigZombi_01') {
        //     }
        //     if(this.timeWalk <= 100 && this.timeWalk >= 0) {
        //         this.controller.action({event: 'move', dir: 'r'});
        //         this.timeWalk++;
        //     }

        //     if(this.timeWalk > 100 && this.timeWalk <= 200) {
        //         this.controller.action({event: 'stop'});
        //         this.timeWalk++;
        //     }

        //     if(this.timeWalk > 200 && this.timeWalk <= 300) {
        //         this.controller.action({event: 'move', dir: 'l'});
        //         this.timeWalk++;
        //     }

        //     if(this.timeWalk > 300 && this.timeWalk < 400) {
        //         this.controller.action({event: 'stop'});
        //         this.timeWalk++;
        //     }

        //     if(this.timeWalk >= 400) {
        //         this.timeWalk = 0;
        //     }
        // }
    }

    touchedAt(collision){
        let actor = collision.other,
            side = collision.side,
            offset = collision.offset,
            hitDelay = 0,
            hitTime,
            endHitTime;
        if( actor.type === 'player' ) {
            clearTimeout(hitTime);
            clearTimeout(endHitTime);
            switch(side) {
                case 'left':
                this.isAttack = true;
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
                actor.x += 25;
                break;
                case 'right':
                this.isAttack = true;
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
                actor.x -= 25;
                break;
                case 'right':
                break;
                default:
                break;
            }
        }
    }

}