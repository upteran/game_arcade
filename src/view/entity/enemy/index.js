import Entity from "./../";


export default class Enemy extends Entity{
    constructor(...arg) {
        super(...arg);
    }
    update() {
        this.body.texture = this.animations.play('move', 100, false);
        super.update();
        super.updateFrameOffsets();
    }
}