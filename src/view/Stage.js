export default class Stage {
    constructor(game, player) {
        this.game = game;
        this._player = player;
        this.element = null;
        this.dir = 's';
        this.speed = 5;
        this.speedup = 0;
        this.reverseSpeed = 0;
        this.bodyTexture = PIXI.Texture.fromImage('res/images/stageBgLong.jpg');
        this.body = new PIXI.extras.TilingSprite( this.bodyTexture, this.game.sceneW, 500 );
        this.body.x = 0;
        this.body.y = 0;
        this.vx = 0;
        this.vy = 0;
        this.body.tilePosition.x = 0;
        this.body.tilePosition.y = 0;
    }
    move(dir){
        this.body.position.x = -this.game.scene.position.x;
        this.body.tilePosition.x = this.game.scene.position.x;
    }
    moveTop(){}
    moveBottom(){}
    render(){
        this.game.scene.addChild( this.body );
    }
}