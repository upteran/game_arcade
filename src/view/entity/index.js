import * as PIXI from 'pixi.js';
import animationsTextureLoader from './../../utils/AnimationsTextureLoader.js';
import * as utils from './../../utils';

export default class Entity {
    constructor(game, model) {
        this.game = game;
        this._model = model;
        this.res = PIXI.loader.resources[model.name.split('_')[0]];
        this.body = new PIXI.Sprite();
        this.animationsTexture = animationsTextureLoader(this.res);
        this.animations = new utils.createAnimations(this.animationsTexture);
        this.body.position.x = this._model.posX;
        this.body.position.y = this._model.posY;
        this.body.width = this._model.width;
        this.body.height = this._model.height;
        this.body.anchor.x = this._model.anchor.x;
        this.body.scale.x = this._model.scaleX;
        this.body.scale.y = this._model.scaleY;
        this.isJumping = this._model.isJumping;
    }

    update() {
        this.move();
        this.demage();
    }

    updateFrameOffsets() {
        this.body.width = this.body.texture.orig.width * this._model.scaleRatio;
        this.body.height = this.body.texture.orig.height * this._model.scaleRatio;
        this.body.position.y = (this._model.posY + this._model.startCharHeight) - this.body.height;
    }

    demage() {
        if(this._model.isDemaged) {
            this.body.texture = this.animations.play('hurt', 400, true);
            if(this.body.alpha !== 0) {
                this.body.alpha -= 1;
                this.body.tint = 0xf2aebc;
            } else {
                this.body.alpha += 1;
                this.body.tint = 0xf2aebc;
            }
        } else {
            this.body.alpha = 1;
            this.body.tint = 0xFFFFFF;
        }
    }

    move() {
        if(this._model.moveType !== 'static') {
            this.body.scale.x = this._model.scaleX;
        }
        this.body.position.x = this._model.posX;
        this.body.position.y = this._model.posY;

    }

    render(){
        this.game.scene.addChild( this.body );
    }

    remove(){
        if(this._model.isDeath) {
            this.game.scene.removeChild( this._container );
        }
    }
}