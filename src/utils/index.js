/*global window*/
import * as PIXI from 'pixi.js';

export function keypress( keyCode ){
    let key = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    key.downHandler = e => {
        if(e.keyCode === key.code) {
            if(key.isUp && key.press) key.press();
            key.isDown = true;
            key.isUp = false;
        }
        e.preventDefault();
    }
    key.upHandler = e => {
        if(e.keyCode === key.code) {
            if(key.isDown && key.release) key.release();
            key.isDown = false;
            key.isUp = true;
        }
        e.preventDefault();
    }
    window.addEventListener('keydown', key.downHandler.bind(key), false);
    window.addEventListener('keyup', key.upHandler.bind(key), false);

    return key;
}


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
