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
        this._baseTexture = PIXI.Texture.fromImage('res/images/player.png');
        this._body = new PIXI.Sprite(this._baseTexture);
        this._mask = new PIXI.Texture(this._baseTexture, new PIXI.Rectangle(10, 460, 120, 130));
        this._body.setTexture(this._mask)
        // this._body = PIXI.Sprite.fromImage('res/images/player.png');
        this._container.position.x = 190;
        this._container.position.y = 327;
        this._body.width = 60;
        this._body.height = 60;
        this.move(this.game.dir);
        this._container.addChild( this._body );
        this.game.stage.addChild( this._container );
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
            default:
            break;
        }
    }
    moveRight(){
        // this.speed += 1;
        console.log('player go right')
        this._container.position.x += 1;
    }
    moveLeft(){
        // this.speed += 1;
        this._container.position.x -= 1;
    }
    moveTop(){
        // this.speed += 1;
    }
    moveBottom(){}
    render(){
        
    }
}