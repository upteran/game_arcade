import Player from './Player';
const EventEmitter = require('events').EventEmitter;

export default class GameModel extends EventEmitter {
    constructor ( game ) {
        super();
        this.game = game;
        this.player = null;
        this.dir = null;
        this.sceneW = window.innerWidth;
        this.sceneH = 500;
        this.callback = null;
        this.lastFrameTime = 0;
        this.player = new Player( this );
    }
    _tick( currTime ) {
        // this.emit('update', currTime - this.lastFrameTime, currTime);
        // this.lastFrameTime = currTime;
        // this.callback();
        // this.renderer.render( this.scene );
        // this.stage.move( this.dir );
        // this.player.move( this.dir );
        // requestAnimationFrame( this._tick.bind( this ));
    }
    changeDir( dir ) {
        console.log('change dir')
        this.dir = dir;
    }
    render() {
    }
}