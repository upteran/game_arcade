import * as PIXI from 'pixi.js';
//x: 800 , y: 337;
export default class Box {
    constructor(game, model) {
        this.game = game;
        this._model = model;
        this._container = new PIXI.Container();
        this.frames = [];
        for( let i =0; i < 3;i++) {
            this.frames.push(PIXI.Texture.fromFrame(`box_${i}`));
        }
        this.body = new PIXI.extras.AnimatedSprite(this.frames);
        this.body.position.x = this._model.posX;
        this.body.position.y = this._model.posY;
        this.body.width = this._model.width;
        this.body.height = this._model.height;
        this._container.addChild( this.body );
        this.body.gotoAndStop(0);
    }
    move() {
        this.body.position.x = this._model.posX;
    }
    remove(){
        if(this._model.isDeath) {
            this.game.scene.removeChild( this._container );
        }
    }
    update(){
        this.demage();
        this.move();
        this.remove();
    }
    demage(){
        if(this._model.health < 50 && this._model.health > 30) {
            this.body.gotoAndStop(1);
        } else if(this._model.health < 30){
            this.body.gotoAndStop(2);
        }
    }
    render(){
        this.game.scene.addChild( this._container );
    }
}