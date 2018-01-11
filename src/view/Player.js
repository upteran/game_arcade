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
        this._body = new PIXI.extras.MovieClip(this.frames);
        this._body.position.x = this.game.sceneW / 2;
        this._body.position.y = 354;
        this._body.anchor.x = 0.5;
        this._body.anchor.y = 0.5;
        this._body.scale.x = 0.5;
        this._body.scale.y = 0.5;
        this._body.vx = 0;
        this._body.vy = 0;
        this._body.animationSpeed = 0.6;
    }
    move( dir ) {
        let compare,
            scale;
        this._body.scale.y = 0.5;
        this._body.play();
        if ( dir == 'r' ) {
            this._body.scale.x = 0.5;
            this._body.vx = 5;
        } else if ( dir == 'l' ) {
            this._body.scale.x = -0.5;
            this._body.vx = -5;
        } else {
            this._body.stop();
            this._body.gotoAndStop(21);
            this._body.vx = 0;
        }
        if(this.isJumping) this._body.gotoAndStop(14);
        this._body.position.x += this._body.vx;

    }
    startJump(){
        if(!this.isJumping) {
            this._body.vy = -10;
            this.isJumping = true;
        }
    }
    jump() {
        this._body.vy += this.gravity;
        this._body.position.y += this._body.vy;
        if(this._body.position.y > 354) {
            this._body.position.y = 354;
            this.isJumping = false;
        }
    }
    jumpEnd() {
        if(this._body.vy < -5){
            this._body.vy = -5;
        }

    }
    moveBottom(){}
    remove(){
        this._container.removeChild( this._body );
    }
    render(){
        this._container.addChild( this._body );
        this.game.scene.addChild( this._container );
    }
}