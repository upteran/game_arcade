export default class Player {
    constructor(game) {
        this.game = game;
        this.dir = 'r';
        this.speed = 5;
        this.speedup = 0;
        this.reverseSpeed = 0;
        this.frames = [];
        for(let i = 0;i < 25;i++) {
            this.frames.push(PIXI.Texture.fromFrame(`player_${i}`))
        }
        this._body = new PIXI.extras.MovieClip(this.frames);
        this._body.position.x = 210;
        this._body.position.y = 337.5;
        this._body.anchor.x = 0.3;
        this._body.anchor.y = 0.3;
        this._body.scale.x = 0.5;
        this._body.scale.y = 0.5;
        this._body.vx = 0;
        this._body.vy = 0;
        this._body.animationSpeed = 0.6;
    }
    moveRight(){
        this._body.scale.x = 0.5;
        this._body.scale.y = 0.5;
        this._body.vx = 1;
        this._body.position.x += this._body.vx * this.speed;
        // console.log(this._body.currentFrame)
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
}