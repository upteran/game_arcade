export default class Player {
    constructor(game) {
        this.game = game;
        this.element = null;
        this.resurces = null;
        this.dir = 'r';
        this.speed = 0;
        this.speedup = 0;
        this.reverseSpeed = 0;
        this._container = new PIXI.Container();
        this._container.position.x = 1;
        this._container.position.y = 1;
        this._body = PIXI.Sprite.fromImage('res/images/player.png');
        this._container.addChild( this._body );
        this.game.stage.addChild( this._container );
        PIXI.loader.add('res/images/player.png').load();
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
    moveRight(){
        this.speed += 1;
    }
    moveLeft(){
        this.speed += 1;
    }
    moveTop(){
        this.speed += 1;
    }
    moveBottom(){}
    render(){
        let player = new PIXI.Sprite(PIXI.loader.resources['res/images/player.png'].texture);
        return player;
    }
}