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
        this.frames = [];
        this._body = PIXI.loader.resources['player'];
        for(let i = 0;i < 2;i++) {
            this.frames.push(PIXI.Sprite.fromFrame(`player_0${i}`))
        }
        this._body.frame = this.frames[0];
        // this.frameLoad();
        this._body = this.frames[0];
        this._body.position.x = 210;
        this._body.position.y = 340;
        this._body.anchor.x = 0.3;
        this._body.anchor.y = 0.3;
        this._body.scale.x = 0.5;
        this._body.scale.y = 0.5;
        this._body.vx = 0;
        this._body.vy = 0;
    }
    // frameLoad() {
    //     for(let i = 0;i < 2;i++) {
    //         this.frames.push(PIXI.Sprite.fromFrame(`player_0${i}`));
    //     }
    // }
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
        this._body.scale.x = 0.5;
        this._body.scale.y = 0.5;
        this._body.vx = 1;
        this._body.position.x += this._body.vx;
    }
    moveLeft(){
        this._body.scale.x = -0.5;
        this._body.scale.y = 0.5;
        this._body.vx = -1;
        this._body.position.x += this._body.vx;
    }
    moveTop(){
        // this.speed += 1;
    }
    moveBottom(){}
    stop(){
        this._body.vx = 0;
        this._body.position.x += this._body.vx;
    }
    remove(){
        this.game.scene.removeChild( this._container );
    }
    render(){
        this.move(this.game.dir);
        this._container.addChild( this._body );
        this.game.scene.addChild( this._container );
    }
}