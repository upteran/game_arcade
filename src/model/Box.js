export default class Box {
    constructor(game, x, y, h, w) {
        this.game = game;
        this.type = 'box';
        this.posX = x;
        this.posY = y;
        this.height = h;
        this.width = w;
    }
}