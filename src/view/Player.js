import * as PIXI from 'pixi.js';
import AnimationsTextureLoader from './../utils/AnimationsTextureLoader.js';
import AnimatedMovies from './../utils/AnimatedMovies.js';


export default class Player {
    constructor(game, model) {
        this.game = game;
        this._model = model;
        this._container = new PIXI.Container();
        this.res = PIXI.loader.resources.player;
        this.animationsSprite = new AnimationsTextureLoader(this.res);
        this.animations = this.animationsSprite.createAnimations();
        this.frames = [];
        // for(let i in this.createdSprite.animations) {
        //     this.createdSprite.animations[i].forEach((item) => {
        //         this.frames.push(item);
        //     })
        // }
        // this.body = new AnimatedMovies(this.frames, this.createdSprite.frameMap);
        this.body = new AnimatedMovies(this.animations, 'stop1');
        this.body.showAnimationsList('player');
        this.animationSpeed = 0.1;
        this.body.play();
        this._currentAnimation = 'stop';
        this.body.position.x = this._model.posX;
        this.body.position.y = this._model.posY;
        this.body.anchor.x = 0.5;
        this.body.anchor.y = 0.5;
        this.body.pivot.x = -(this._model.width / 2);
        this.body.pivot.y = -(this._model.height / 2);
        this.body.scale.x = this._model.scaleX;
        this.body.scale.y = this._model.scaleY;
        this.isJumping = this._model.isJumping;
        this.stopTime = 0;

        // player rect
        // this.rect = new PIXI.Graphics();
        // this.rect.beginFill(0, 2);
        // this.rect.drawRect(this.body.position.x, this.body.position.y, this.body.width, this.body.height);
        // this.rect.endFill();
        // this.rect.pivot.x = this.body.position.x;
        // this.rect.pivot.y = this.body.position.y;
        // this._container.addChild( this.rect );

        this._container.addChild( this.body );
    }
    update() {
        // this.rect.position.x = this.body.position.x;
        // this.rect.position.y = this.body.position.y;
        this.move();
        this.jump();
    }
    changeAnimation(move){
        if(move === this._currentAnimation) {
            return;
        }
        this._currentAnimation = move;
        switch(move) {
            case 'move':
            this.body.play('move');
            this.body.loop = true;
            this.body.animationSpeed = 0.5;
            break;
            case 'stop':
            this.body.play('stop');
            this.body.loop = false;
            this.body.animationSpeed = 0.1;
            break;
            case 'stop1':
            this.body.play('stop1');
            this.body.loop = true;
            this.body.animationSpeed = 0.2;
            break;
            case 'down':
            this.body.play('down');
            this.body.loop = false;
            this.body.animationSpeed = 0.5;
            break;
            case 'jump':
            this.body.play('jump');
            this.body.loop = false;
            this.body.animationSpeed = 0.5;
            break;
        }
    }
    move() {
        if(this._model.down){
            this.stopTime = 0;
            this.changeAnimation('down');
        } else if(this.body.position.y < this._model.posYcurr) {
            this.stopTime = 0;
            this.changeAnimation('jump');

        } else if(this._model.vx !== 0) {
            this.stopTime = 0;
            this.changeAnimation('move');
            this.body.scale.x = this._model.scaleX;
            this.body.pivot.x = -(Math.sign(this._model.scaleX) * (this._model.width / 2));
        }
        else {
            this.stopTime++;
            if(this.stopTime / 60 > 3) {
                this.changeAnimation('stop');
            } else {
                this.changeAnimation('stop1');
            }
        }
        this.body.position.x = this._model.posX;

    }
    playerTouched(type) {}
    jump() {
        this.body.position.y = this._model.posY;
    }
    render(){
        this.game.scene.addChild( this._container );
    }
}