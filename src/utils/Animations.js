import * as PIXI from 'pixi.js';
import * as core from 'pixi.js/lib/core';


export default class Animations extends PIXI.Sprite {
    constructor(animations, autoUpdate) {
        super();
        this._animations = animations;
        this._durations = null;
        this._textures = null;
        this._autoUpdate = autoUpdate !== false;
        this.animationSpeed = 1;
        this.loop = true;
        this.onComplete = null;
        this.onFrameChange = null;
        this._currentTime = 0;
        this._currentTextures = null;
        this._currAnimation = null;
    }
    // show character animations
    showAnimationsList(char){
        for(let anim in this._animations) {
            console.log(`${char} has anim ${anim}`);
        }
    }
    selectAnimation(name, speed, loop) {
        if(this._currAnimation === name) {
            return;
        }
        for(let animation in this._animations) {
            if(name === animation) {
                this._currAnimation = name;
                this.animationSpeed = speed;
                this.loop = loop;
                this._textures = this._animations[name];
            }
        }
        this.play();
    }
    stop()
    {
        if (!this.playing)
        {
            return;
        }
        this.playing = false;
        if (this._autoUpdate)
        {
            core.ticker.shared.remove(this.update, this);
        }
    }
    play()
    {
        if (this.playing)
        {
            return;
        }
        this.playing = true;
        if (this._autoUpdate)
        {
            core.ticker.shared.add(this.update, this);
        }
    }
    update(deltaTime)
    {
        const elapsed = this.animationSpeed * deltaTime;
        const previousFrame = this.currentFrame;
        if (this._durations !== null)
        {
            let lag = this._currentTime % 1 * this._durations[this.currentFrame];
            lag += elapsed / 60 * 1000;
            while (lag < 0)
            {
                this._currentTime--;
                lag += this._durations[this.currentFrame];
            }
            const sign = Math.sign(this.animationSpeed * deltaTime);
            this._currentTime = Math.floor(this._currentTime);
            while (lag >= this._durations[this.currentFrame])
            {
                lag -= this._durations[this.currentFrame] * sign;
                this._currentTime += sign;
            }
            this._currentTime += lag / this._durations[this.currentFrame];
        }
        else
        {
            this._currentTime += elapsed;
        }
        if (this._currentTime < 0 && !this.loop)
        {
            this.gotoAndStop(0);
            if (this.onComplete)
            {
                this.onComplete();
            }
        }
        else if (this._currentTime >= this._textures.length && !this.loop)
        {
            this.gotoAndStop(this._textures.length - 1);
            if (this.onComplete)
            {
                this.onComplete();
            }
        }
        else if (previousFrame !== this.currentFrame)
        {
            this.updateTexture();
        }
    }
    gotoAndStop(frameNumber)
    {
        this.stop();
        const previousFrame = this.currentFrame;
        this._currentTime = frameNumber;
        if (previousFrame !== this.currentFrame)
        {
            this.updateTexture();
        }
    }
    /**
     * Goes to a specific frame and begins playing the AnimatedSprite
     *
     * @param {number} frameNumber - frame index to start at
     */
    gotoAndPlay(frameNumber)
    {
        const previousFrame = this.currentFrame;
        this._currentTime = frameNumber;
        if (previousFrame !== this.currentFrame)
        {
            this.updateTexture();
        }
        this.play();
    }
    /**
     * Updates the displayed texture to match the current frame index
     *
     * @private
     */
    updateTexture()
    {
        this._texture = this._textures[this.currentFrame];
        this._textureID = -1;
        if (this.onFrameChange)
        {
            this.onFrameChange(this.currentFrame);
        }
    }
    /**
     * Stops the AnimatedSprite and destroys it
     *
     */
    destroy()
    {
        this.stop();
        super.destroy();
    }
        get totalFrames()
    {
        return this._textures.length;
    }
    /**
     * The array of textures used for this AnimatedSprite
     *
     * @member {PIXI.Texture[]}
     */
    get textures()
    {
        return this._textures;
    }
    set textures(value) // eslint-disable-line require-jsdoc
    {
        if (value[0] instanceof core.Texture)
        {
            this._textures = value;
            this._durations = null;
        }
        else
        {
            this._textures = [];
            this._durations = [];
            for (let i = 0; i < value.length; i++)
            {
                this._textures.push(value[i].texture);
                this._durations.push(value[i].time);
            }
        }
    }
    /**
    * The AnimatedSprites current frame index
    *
    * @member {number}
    * @readonly
    */
    get currentFrame()
    {
        let currentFrame = Math.floor(this._currentTime) % this._textures.length;
        if (currentFrame < 0)
        {
            currentFrame += this._textures.length;
        }
        return currentFrame;
    }
}