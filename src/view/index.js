import Player from './Player';
import Stage from './Stage';
const EventEmitter = require('events').EventEmitter;

export default class GameView extends EventEmitter {
    constructor ( model, element ) {
        super();
        this.element = element;
        this.model = model;
        this.player = null;
        this.dir = null;
        this.scene = new PIXI.Container();
        this.sceneW = window.innerWidth;
        this.lastFrameTime = 0;
        this.stage = new Stage( this );
        this.player = new Player( this );
    }
    _tick( currTime ) {
        this.emit('update', currTime - this.lastFrameTime, currTime);
        this.lastFrameTime = currTime;
        this.renderer.render( this.scene );
        this.stage.move( this.dir );
        this.player.move( this.dir );
        requestAnimationFrame( this._tick.bind( this ));
    }
    changeDir( dir ) {
        console.log('change dir')
        this.dir = dir;
    }
    render() {
        this.stage.render();
        this.player.render();
        this.renderer = PIXI.autoDetectRenderer(window.innerWidth, 500, {
            transparent: true
        });
        this.element.appendChild( this.renderer.view );
        requestAnimationFrame( this._tick.bind( this ));
    }

}