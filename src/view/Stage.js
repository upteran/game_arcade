export default class Stage {
    constructor(game, player) {
        this.game = game;
        this._player = player;
        this.element = null;
        this.dir = 's';
        this.speed = 5;
        this.speedup = 0;
        this.reverseSpeed = 0;
        this.stageBodyTexture = PIXI.Texture.fromImage('res/images/stageBgLong.jpg');
        this.stageBody = new PIXI.extras.TilingSprite( this.stageBodyTexture, this.game.sceneW, 500 );
        this.stageBody.x = 0;
        this.stageBody.y = 0;
        this.vx = 0;
        this.vy = 0;
        this.stageBody.tilePosition.x = 0;
        this.stageBody.tilePosition.y = 0;
    }
    move(dir){
        switch(dir) {
            case 'r':
            this.moveRight();
            break;
            case 'l':
            this.moveLeft();
            break;
            case 'jump':
            this.moveTop();
            break;
            case 'b':
            this.moveBottom();
            case 's':
            this.stop();
            break;
            default:
            break;
        }
    }
    moveRight(){
        this.stageBody.position.x += 5;
        this.stageBody.tilePosition.x -= 5;
    }
    moveLeft(){
        this.stageBody.position.x -= 5;
        this.stageBody.tilePosition.x += 5;
    }
    moveTop(){}
    moveBottom(){}
    stop(){}
    render(){
        this.game.scene.addChild( this.stageBody );
    }
}