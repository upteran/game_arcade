import * as PIXI from 'pixi.js';
import AnimationsTextureLoader from './../../utils/AnimationsTextureLoader.js';
import AnimatedMovies from './../../utils/AnimatedMovies.js';


export default class Lumpi {
    constructor(game, model) {
        this.game = game;
        this._model = model;
        this._container = new PIXI.Container();
        this.res = PIXI.loader.resources.lumpi;
        this.animationsSprite = new AnimationsTextureLoader(this.res);
        this.animations = this.animationsSprite.createAnimations();
        this.body = new AnimatedMovies(this.animations, 'move');
        this.body.showAnimationsList('lumpi');
        this.animationSpeed = 0.1;
        this.body.play();
        this._currentAnimation = 'move';
        this.body.position.x = this._model.posX;
        this.body.position.y = this._model.posY;
        this.body.anchor.x = 0.5;
        // let MARGIN = 10;
        // this.body.pivot.x = -((this._model.width - MARGIN) / 2);
        this.body.scale.x = this._model.scaleX;
        this.body.scale.y = this._model.scaleY;
        this._container.addChild( this.body );
    }
    update() {
        this.move();
    }
    changeAnimation(move){}
    move() {
        this.body.scale.x = this._model.scaleX;
        this.body.position.x = this._model.posX;
    }
    moveY() {}
    render(){
        this.game.scene.addChild( this._container );
    }
}