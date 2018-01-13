export default class Player {
    constructor(game, model) {
        this.game = game;
        this._model = model;
        this._container = new PIXI.Container();
        this.frames = [];
        for(let i = 0;i < 25;i++) {
            this.frames.push(PIXI.Texture.fromFrame(`player_${i}`))
        }
        this.body = new PIXI.extras.MovieClip(this.frames);
        this.body.position.x = this._model.posX;
        this.body.position.y = this._model.posY;
        this.body.scale.x = this._model.scaleX;
        this.body.scale.y = this._model.scaleY;
        this.body.anchor.x = 0.5;
        this.body.anchor.y = 0.5;
        this.body.animationSpeed = 0.5;
        this._container.addChild( this.body );
    }
    move() {
        if(this._model.vx === 0) {
            this.body.stop();
            this.body.gotoAndStop(21);
        } else {
            this.body.play();
            this.body.scale.x = this._model.scaleX;
        }
        if(this.body.position.y < this._model.posYcurr) this.body.gotoAndStop(14);
        this.body.position.x += this._model.vx;

    }
    jump() {
        this.body.position.y = this._model.posY;
    }
    moveDown(){}
    remove(){
        this._container.removeChild( this.body );
    }
    render(){
        this.game.scene.addChild( this._container );
    }
}