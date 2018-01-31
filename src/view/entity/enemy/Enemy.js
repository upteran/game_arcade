import Entity from "./../Entity";


export default class Enemy extends Entity{
    constructor(...arg) {
        super(...arg);
    }
    update() {
        this.body.texture = this.selectTexture('move');
        super.update();
        super.updateFrameOffsets();
    }
}