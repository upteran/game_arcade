import Entity from './Entity';

export default class Box extends Entity {
    constructor(game, props) {
        super(game, props)
        this.animation = props.animation || false;
    }
    update() {
        super.update();
        this.move();
    }
    move() {
        if(this.animation) {
            if(this.posX === this.posGameStartX + 70){
                this.step = -this.step;
            } else if( this.posX === this.posGameStartX){
                this.step = Math.abs(this.step);
            }
            this.posX += this.step;
        }
    }
    touchedAt(collision) {
        let actor = collision.other,
            side = collision.side,
            offset = collision.offset,
            move = actor.currMoveType;
        if(actor.type === 'player' && actor.currMoveType === 'hit' && (side === 'left' || side === 'right')) {
            this.isHited = true;
            if(this.health < 0) {
                this.remove();
            } else {
                this.health--;
            }
        }
    }
}