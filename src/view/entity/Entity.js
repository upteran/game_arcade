import * as PIXI from 'pixi.js';
import * as utils from './../../utils';

export default class Entity {
    static Create(game, model) {
        let view = new this(game, model);
        return view;
    }
    constructor(game, model) {
        this.game = game;
        this._model = model;
        this.name = this._model.name;
        this.res = PIXI.loader.resources[this._model.name.split('_')[0]];
        this.body = new PIXI.Sprite();
        this.textures = utils.textureLoader(this.res);
        this.currTextureNum = 0;
        this.currTextureName = null;
        this.body.width = this._model.width;
        this.body.height = this._model.height;
        this.body.position.x = this._model.x;
        this.body.position.y = this._model.y - this._model.height;
        this.body.anchor.x = 0.5;
        this.body.anchor.y = 0;
        this.body.scale.x = this._model.scaleRatio;
        this.body.scale.y = this._model.scaleRatio;
    }

    update() {
        this.move();
        if(this._model.currAction !== 'static' && this._model.currAction !== 'hide') this.updateFrameOffsets();
    }

    updateFrameOffsets() {
        this.body.width = this.body.texture.orig.width * Math.abs(this._model.scaleRatio);
        this.body.height = this.body.texture.orig.height * Math.abs(this._model.scaleRatio);
        this.body.position.y = this._model.y - this.body.height;
    }

    selectTexture ( name , speed , stop ) {
        let animSpeed = (speed) ? speed : 60;
        if(stop && this.currTextureNum === this.textures[name].length - 1) {
            this.currTextureNum = this.textures[name].length - 1;
            return this.textures[name][this.textures[name].length - 1];
        } else {
            this.currTextureNum = Math.floor(new Date().valueOf() / animSpeed) % this.textures[name].length;
            return this.textures[name][this.currTextureNum];
        }
    }

    demage() {
            if(this.body.alpha !== 0) {
                this.body.alpha -= 1;
                this.body.tint = 0xf2aebc;
            } else {
                this.body.alpha += 1;
                this.body.tint = 0xf2aebc;
            }
    }

    move() {
        if( this._model.currAction ) {
            if(this.currTextureName !== this._model.currAction) {
                this.currTextureNum = 0;
                this.currTextureName = this._model.currAction;
            }
            if( this._model.currAction === 'static' ) {
                this.body.texture = this.selectTexture('default');
            } else if ( this._model.currAction === 'death' ) {
                if(this.textures['death']) {
                    this.body.texture = this.selectTexture('death', 100, true);
                } else {
                    this.remove();
                }
            } else {
                this.body.scale.x = this._model.scaleRatio;
                this.body.texture = this.selectTexture(`${this._model.currAction}`);
            }

            if( this._model.currAction === 'hurt' ) {
                this.demage();
            } else {
                this.body.alpha = 1;
                this.body.tint = 0xFFFFFF;
            }
        } else {
            this.body.texture = this.selectTexture('default');
        }
        this.body.position.x = this._model.x;
        this.body.position.y = this._model.y - this._model.height;

    }

    render(){
        this.game.scene.addChild( this.body );
    }

    remove(){
        this.game.scene.removeChild( this.body );
    }
}