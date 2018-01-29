import Entity from './../';

export default class Lumpi extends Entity {
    constructor(game, props) {
        super(game, props);
        this.distance = props.distance || 100;
        this.onEarth = true;
        this.gravity = 0.17;
    }
    update( dir ) {
        super.update( dir );
        this.move();
    }
    touchedAt(collision){
        // console.log('touch')
    }
    move(){
        this.posX += this.step;
        super.startJump(-5);
        if(this.posX > (this.posGameStartX + this.distance)) {
            this.step = -this.step;
            this.scaleX = -this.scaleX;
        } else if(this.posX <= this.posGameStartX) {
            this.step = Math.abs(this.step);
            this.scaleX = Math.abs(this.scaleX);
        }
    }
}