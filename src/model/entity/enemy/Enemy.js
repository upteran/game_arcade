/* global setTimeout , clearTimeout*/
import Entity from './../Entity';

export default class Enemy extends Entity {
    constructor(game, props) {
        super(game, props);
        this.distance = props.distance || 100;
        this.onEarth = true;
        this.gravity = props.gravity || 0.17;
        this.step = props.step || 0.3;
    }

    update() {
        super.update();
        this.move();
    }

    touchedAt(collision){
        let actor = collision.other,
            side = collision.side,
            offset = collision.offset;
        if(actor.type === 'player' && actor.isHited) {
            this.lastStep = this.step;
            this.isDemaged = true;
            this.step = 0;
            clearTimeout(this.demageTime);
            this.demageTime = setTimeout(() => {
              this.isDemaged = false;
              this.step = this.lastStep;
            }, 700)
            switch(side) {
                case 'left':
                this.posX -= offset;
                break;
                case 'right':
                this.posX += offset;
                break;
                default:
                break;
            }
        }
    }

    move(){
        this.posX += this.step;
        if(this.posX > (this.posGameStartX + this.distance)) {
            this.step = -this.step;
            this.scaleX = -this.scaleX;
        } else if(this.posX <= this.posGameStartX) {
            this.step = Math.abs(this.step);
            this.scaleX = Math.abs(this.scaleX);
        }
    }
}