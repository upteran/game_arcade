import Entity from './';

export default class Box extends Entity {
    constructor(game, props) {
        super(game, props)
        this.animation = props.animation || false;
        this.animationAxis = props.animationAxis || 'x';
        this.step = 0.5;
        this.distance = props.distance || 70;
    }
    update() {
        super.update();
        this.move();
    }
    move() {
        if(this.animation) {
            if(this.animationAxis === 'x') {
                if(this.posX === this.posGameStartX + this.distance){
                this.step = -this.step;
                this.currMoveType = 'right';
                } else if( this.posX === this.posGameStartX){
                    this.step = Math.abs(this.step);
                    this.currMoveType = 'left';
                }
                this.posX += this.step;
            } else if(this.animationAxis === 'y') {
                if(this.posY === this.posGameStartY + this.distance){
                    this.step = -this.step;
                    this.currMoveType = 'down';
                } else if( this.posY === this.posGameStartY){
                    this.step = Math.abs(this.step);
                    this.currMoveType = 'top';
                }
                this.posY += this.step;
            }
        }
    }

    touchedAt(collision) {
        // let actor = collision.other,
        //     side = collision.side,
        //     offset = collision.offset,
        //     move = actor.currMoveType;
        // if(actor.type === 'player' && actor.currMoveType === 'hit' && (side === 'left' || side === 'right')) {
        //     this.isHited = true;
        //     console.log('hit')
        //     if(this.health < 0) {
        //         this.remove();
        //     } else {
        //         this.health--;
        //     }
        // }
    }
}