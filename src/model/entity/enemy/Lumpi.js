import Entity from './../Entity';

export default class Lumpi extends Entity {
    constructor(game, props) {
        super(game, props);
        this.distance = props.distance || 100;
        this.onEarth = true;
    }
    update( dir ) {
        super.update( dir );
        this.move();
        // super.moveY()
    }
    touchedAt(collision){
        // console.log('touch')
    }
    move(){
        this.posX += this.step;
        super.startJump(-8);
        if(this.posX > (this.posGameStartX + this.distance)) {
            this.step = -this.step;
            this.scaleX = -this.scaleX;
        } else if(this.posX <= this.posGameStartX) {
            this.step = Math.abs(this.step);
            this.scaleX = Math.abs(this.scaleX);
        }
    }
}