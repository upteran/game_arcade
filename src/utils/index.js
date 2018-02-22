/*global window*/
import * as PIXI from 'pixi.js';

export function textureLoader ({ data }){
    let animations = data.animations,
        image = data.image;
    let animationsRes = {};
    for(let name in animations) {
        let textures = [];
        // jump
        for(let frame in animations[name]) {
            // player
            let frameData = animations[name][frame].frame;
            let baseTexture = PIXI.BaseTexture.fromImage(`res/images/${image}`);
            let rect = new PIXI.Rectangle(frameData.x, frameData.y, frameData.w, frameData.h);
            let texture = new PIXI.Texture(baseTexture, rect);
            texture.textureCacheIds.push(frame);
            textures.push(texture);
        }
        animationsRes[name] = textures;
    }
    // console.log(animationsRes)
    return animationsRes;
}
