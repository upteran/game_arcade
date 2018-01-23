export default class Enemy {
    constructor(game, name, x, y, width, height, type) {
        this.game = game;
        this.type = type;
        this.name = name;
        this.isJumping = false;
        this.gravity = 0.5;
        this.sourceWidth = width;
        this.sourceHeight = height;
        this.scaleRatio = 1.3;
        let MARGIN = 15;
        this.width = (this.sourceWidth - MARGIN) * this.scaleRatio;
        this.height = this.sourceHeight * this.scaleRatio;
        this.startCharWidth = this.width;
        this.startCharHeight = this.height;
        this.posX = x;
        this.posY = y - this.height;
        this.posGameStartX = this.posX;
        this.posYcurr= this.posY;
        this.scaleX = this.scaleRatio;
        this.scaleY = this.scaleRatio;
        this.down = false;
        this.vx = 0;
        this.vy = 0;
        this.isHited = false;
        this.currMoveType = 'move';
    }
    update(){
        this.move();
    }
    hit() {}
    touchedAt() {}
}