/*global window*/
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

export class createAnimations {
    constructor(animations, initialAnimation) {
        this.animations = animations;
        this.initialAnimations = initialAnimation;
        this.lastFrame = 0;
        this.currAnimation = this.initialAnimations;
    }
    play(name, speed, isLoop) {
        let currTexture = null;
        if (this.currAnimation !== name) {
            this.lastFrame = 0;
        }
        let currTime = new Date().valueOf();
            this.currAnimation = name;
            if(isLoop && this.lastFrame === this.animations[name].length - 1) {
                currTexture = this.animations[name][this.animations[name].length - 1];
                return currTexture;
            }
            let currFrame = Math.floor(currTime / speed) % this.animations[name].length;
            currTexture = this.animations[name][currFrame];
            this.lastFrame = currFrame;
            return currTexture;
    }
}