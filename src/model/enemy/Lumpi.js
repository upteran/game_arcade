import Enemy from './index.js';

export default class Lumpi extends Enemy {
    constructor(...args) {
        super(...args);
        this.distance = 100;
        this.health = 150;
        this.step = 1;
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