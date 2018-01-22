export default class Box {
    constructor(game, x, y, h, w, animation) {
        this.game = game;
        this.type = 'box';
        this.height = h;
        this.width = w;
        this.posX = x;
        this.posY = y - this.height;
        this.startPosX = this.posX;
        this.animation = animation || false;
        this.step = 1;
        this.isDeath = false;
        this.health = 70;
        this.isHited = false;
    }
    update() {
        let collision = this.game.actorTouched( this );
        if(collision) {
            this.touchedAt(collision);
        }
        this.move();
    }
    move() {
        if(this.animation) {
            if(this.posX === this.startPosX + 70){
                this.step = -this.step;
            } else if( this.posX === this.startPosX){
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
    remove() {
        this.isDeath = true;
        this.game.actors = this.game.actors.filter(item => item !== this);
        console.log(this.game.actors)
    }
}