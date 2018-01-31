import Enemy from './Enemy';

export default class Lumpi extends Enemy {
    constructor(...arg) {
        super(...arg);
    }
    move(){
        super.move();
        super.startJump(-5);
    }
}