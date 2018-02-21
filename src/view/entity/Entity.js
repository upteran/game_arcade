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
        this.body.width = this._model.width;
        this.body.height = this._model.height;
        this.body.position.x = this._model.x;
        this.body.position.y = this._model.y - this._model.height;
        this.body.anchor.x = 0.5;
        this.body.anchor.y = 0;
        this.body.scale.x = this._model.scaleRatio;
        this.body.scale.y = this._model.scaleRatio;
        // this.isJumping = this._model.isJumping;
    }

    update() {
        this.move();
        if(this._model.moveType !== 'static') this.updateFrameOffsets();
    }

    updateFrameOffsets() {
        this.body.width = this.body.texture.orig.width * Math.abs(this._model.scaleRatio);
        this.body.height = this.body.texture.orig.height * Math.abs(this._model.scaleRatio);
        this.body.position.y = this._model.y - this.body.height;
    }

    selectTexture ( name ) {
        return this.textures[name][Math.floor(new Date().valueOf() / 60) % this.textures[name].length]
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

        let lastPos = this.body.position.x;
        if(this._model.currAction) {
            this.body.texture = this.selectTexture(`${this._model.currAction}`);
        } else {
            this.body.texture = this.selectTexture('default');
        }
        if(this._model.currAction === 'hurt') {
            this.demage();
        } else {
            this.body.alpha = 1;
            this.body.tint = 0xFFFFFF;
        }

        // if(this._model.type === 'player') {
        //     console.log(this._model.scaleRatio)
        // }
        if(this._model.moveType !== 'static') {
            this.body.scale.x = this._model.scaleRatio;
        }
        this.body.position.x = this._model.x;
        this.body.position.y = this._model.y - this._model.height;

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