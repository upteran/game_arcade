import Entity from "./../";


export default class HypnoWorm extends Entity{
    constructor(...arg) {
        super(...arg);
    }
    update() {
        this.body.texture = this.animations.play('move', 100, false);
        super.update();
    }
}