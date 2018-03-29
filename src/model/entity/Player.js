import Entity from './Entity';
import PlayerController from './../../controller/Player';

export default class Player extends Entity {

    constructor(...arg) {
        super(...arg);
        this.lastCollision = null;
        this.controller = new PlayerController(this);
    }

    update(){
        super.update();
        let vitality = this.advantages.find(({ type }) => type === 'Vitality');
        if(vitality.isDeath) this.gameOver();

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
        let move = this.advantages.filter(({ type }) => type === 'Moving');
        let hit = this.advantages.filter(({ type }) => type === 'Hit');
        if(actor.type !== 'enemy') {
            move[0].action({event: 'barrier', collision});
        }
        else if(actor.type === 'enemy' || actor.type === 'hit') {
            clearTimeout(hitTime);
            switch(side) {
                case 'bottom':
                hit[0].action({event: 'hit', type: 'combo'});
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

        else if(actor.type === 'damage') {
            let vitality = this.advantages.find(({ type }) => type === 'Vitality');
            vitality.isDeath = true;
        }
    }

    gameOver() {
        this.game.state = 'gameover';
        this.controller.remove();
    }

}