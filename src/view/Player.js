export default class Player {
    constructor(game, model) {
        this.game = game;
        this.model = model;
        this.dir = 'r';
        this.isJumping = false;
        this.maxJumpHeight = 50;
        this.gravity = 0.5;
        this._container = new PIXI.Container();
        this.frames = [];
        for(let i = 0;i < 25;i++) {
            this.frames.push(PIXI.Texture.fromFrame(`player_${i}`))
        }
        this.body = new PIXI.extras.MovieClip(this.frames);
        this.body.position.x = this.game.sceneW / 2;
        this.body.position.y = 354;
        this.body.anchor.x = 0.5;
        this.body.anchor.y = 0.5;
        this.body.scale.x = 0.5;
        this.body.scale.y = 0.5;
        this.body.vx = 0;
        this.body.vy = 0;
        this.body.animationSpeed = 0.6;
    }
    move( dir ) {
        let compare,
            scale;
        this.body.scale.y = 0.5;
        this.body.play();
        if ( dir == 'r' ) {
            this.body.scale.x = 0.5;
            this.body.vx = 5;
        } else if ( dir == 'l' ) {
            this.body.scale.x = -0.5;
            this.body.vx = -5;
        } else {
            this.body.stop();
            this.body.gotoAndStop(21);
            this.body.vx = 0;
        }
        if(this.isJumping) this.body.gotoAndStop(14);
        this.body.position.x += this.body.vx;

    }
    startJump(){
        if(!this.isJumping) {
            this.body.vy = -10;
            this.isJumping = true;
        }
    }
    jump() {
        this.body.vy += this.gravity;
        this.body.position.y += this.body.vy;
        if(this.body.position.y > 354) {
            this.body.position.y = 354;
            this.isJumping = false;
        }
    }
    jumpEnd() {
        if(this.body.vy < -5){
            this.body.vy = -5;
        }

    }
    moveBottom(){}
    remove(){
        this._container.removeChild( this.body );
    }
    render(){
        this._container.addChild( this.body );
        this.game.scene.addChild( this._container );
    }
}