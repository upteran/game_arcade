import Entity from './Entity';

export default class Environment extends Entity {

    constructor(...arg) {
        super(...arg);
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


    touchedAt(collision){
        let actor = collision.other,
            side = collision.side,
            offset = collision.offset;
        if( actor.type === 'player' || actor.type === 'enemy' ) {
            switch(side) {
                case 'right':
                actor.x = this.x - this.width / 2 - actor.width / 2;
                break;
                case 'left':
                actor.x = this.x + this.width / 2 + actor.width / 2;
                break;
                case 'top':
                actor.y = this.y - this.height;
                break;
                case 'bottom':
                actor.y = this.y + actor.height;
                default:
                break;
            }
        }
    }

}