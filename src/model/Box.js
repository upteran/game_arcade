export default class Box {
    constructor(game, x, y, h, w, animation) {
        this.game = game;
        this.type = 'box';
        this.height = h;
        this.width = w;
        this.posX = x;
        this.posY = y - this.height;
        this.startPosX = this.posX;
        this.animation = animation || false;
        this.step = 1;
    }
    move(){
        if(this.animation) {
            if(this.posX === this.startPosX + 70){
                this.step = -this.step;
            } else if( this.posX === this.startPosX){
                this.step = Math.abs(this.step);
            }
            this.posX += this.step;
        }
    }
}