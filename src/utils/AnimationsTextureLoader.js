import * as PIXI from 'pixi.js';
import * as core from 'pixi.js/lib/core';

export default class AnimationsTextureLoader extends PIXI.Sprite {
    constructor(res) {
        super();
        this.data = res.data;
        this.image = this.data.image;
        this.animations = this.data.animations;
    }
    createAnimations( data ) {
        let animations = {};
        let frameMap = {};
        let animSprite = {};
        for(let name in this.animations) {
            let textures = [];
            let frameList = [];
            // jump
            for(let frame in this.animations[name]) {
                // player
                let frameData = this.animations[name][frame].frame;
                let baseTexture = PIXI.BaseTexture.fromImage(`res/images/${this.image}`);
                let rect = new PIXI.Rectangle(frameData.x, frameData.y, frameData.w, frameData.h);
                let texture = new PIXI.Texture(baseTexture, rect);
                texture.textureCacheIds.push(frame);
                textures.push(texture);
                frameList.push(frame)
            }
            animations[name] = textures;
        }
        return animations;
    }
}