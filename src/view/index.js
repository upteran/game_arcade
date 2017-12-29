import Player from './Player';
import Stage from './Stage';
const EventEmitter = require('events').EventEmitter;

export default class GameView extends EventEmitter {
    constructor ( element ) {
        super();
        this.element = element;
        this.player = null;
        this.dir = null;
        this.stage = new PIXI.Container();
        this.stageBodyTexture = PIXI.Texture.fromImage('res/images/stageBg.png');
        this.stageBody = new PIXI.extras.TilingSprite( this.stageBodyTexture, window.innerWidth, 500 );
        this.stageBody.x = 0;
        this.stageBody.y = 0;
        this.stageBody.tilePosition.x = 0;
        this.stageBody.tilePosition.y = 0;
        this.stage.addChild( this.stageBody );
        this.renderer = PIXI.autoDetectRenderer(window.innerWidth, 500, {
            transparent: true,
            view: document.getElementById('gameScene')
        });
        this.element.appendChild( this.renderer.view );
        this.lastFrameTime = 0;
        this._addPlayer();
    }
    _addPlayer() {
        this.player = new Player( this );
    }
    _tick( currTime ) {
        this.emit('update', currTime - this.lastFrameTime, currTime);
        this.lastFrameTime = currTime;
        this.renderer.render( this.stage );
        this.player.move(this.dir);
        requestAnimationFrame( this._tick.bind( this ));
    }
    changeDir( dir ) {
        console.log('change dir')
        this.dir = dir;
    }
    render() {
        requestAnimationFrame( this._tick.bind( this ));
    }

}