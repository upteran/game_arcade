export default class Player {
    constructor(game) {
        this.game = game;
        this.dir = 'r';
        this.speed = 0;
        this.speedup = 0;
        this.reverseSpeed = 0;
        this._container.position.x = 1;
        this._container.position.y = 1;
    }
    move(dir){
        switch(dir) {
            case 'r':
            this.moveRight();
            break;
            case 'l':
            this.moveLeft();
            break;
            case 't':
            this.moveTop();
            break;
            case 'b':
            this.moveBottom();
            break;
        }
    }
}