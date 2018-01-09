export default class Stage {
    constructor(game, scene) {
        this.game = game;
        this.element = null;
        this.resurces = null;
        this.dir = 's';
        this.speed = 0;
        this.speedup = 0;
        this.reverseSpeed = 0;
        this.stageBodyTexture = PIXI.Texture.fromImage('res/images/stageBg.png');
        this.stageBody = new PIXI.extras.TilingSprite( this.stageBodyTexture, window.innerWidth, 500 );
        this.stageBody.x = 0;
        this.stageBody.y = 0;
        this.vx = 0;
        this.vy = 0;
        this.cameraX = 0;
        this.cameraY = 0;
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
            case 't':
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
        this.vx = 1;
        // this.cameraX += this.vx;
        // if(this.cameraX > 100) {
        //     this.stageBody.tilePosition.x -= this.vx;
        // }
    }
    moveLeft(){
        this.vx = -1;
        // this.cameraX += this.vx;
        // if(this.cameraX < 0) {
        //     this.stageBody.tilePosition.x += this.vx;
        // }
    }
    moveTop(){}
    moveBottom(){}
    stop(){
        this.vx = 0;
    }
    render(){
        this.game.scene.addChild( this.stageBody );
    }
}