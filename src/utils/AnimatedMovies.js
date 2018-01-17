import * as PIXI from 'pixi.js';
import * as core from 'pixi.js/lib/core';

export default class AnimatedMovies extends PIXI.extras.AnimatedSprite {
    constructor(animations, initialAnimation)
    {
        super(animations[initialAnimation]);
        this._animations = animations;
        this.animationSpeed = 0.1;
        this.loop = true;
        this._initialAnimation = initialAnimation;
        this._currAnimation = initialAnimation;
        this.textures = this._animations[this._initialAnimation];
    }
    showAnimationsList(char){
        for(let anim in this._animations) {
            console.log(`${char} has anim ${anim}`);
        }
    }
    play(namedAnimation)
    {
        console.log('play')
        if (this._currAnimation === namedAnimation)
        {
            return;
        }
        if (this._autoUpdate)
        {
            core.ticker.shared.remove(this.update, this);
        }
        this._currAnimation = namedAnimation ? namedAnimation : this._initialAnimation;
        this._textures = this._animations[this._currAnimation];
        this.playing = true;
        if (this._autoUpdate)
        {
            core.ticker.shared.add(this.update, this);
        }
    }
}