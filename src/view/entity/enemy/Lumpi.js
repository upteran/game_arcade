import Entity from "./../";


export default class Lumpi extends Entity{
    constructor(...arg) {
        super(...arg);
    }
    update() {
        this.body.texture = this.animations.play('move', 150, false);
        super.update();
    }
}