import Player from './Player';
// import Stage from './Stage';
const EventEmitter = require('events').EventEmitter;

export default class GameModel extends EventEmitter {
    // constructor ( element ) {
    //     super();
    //     this.element = element;
    //     this.dir = null;
    //     this.sceneW = window.innerWidth;
    //     this.sceneH = window.innerHeight;
    //     this.lastFrameTime = 0;
    //     // this.stage = new Stage( this );
    //     this.player = new Player( this );
    //     // this.camera = new Camera( this, this.player, this.stage );
    // }
    // _tick( currTime ) {
    //     this.emit('update', currTime - this.lastFrameTime, currTime);
    //     this.lastFrameTime = currTime;
    //     this.update();
    //     requestAnimationFrame( this._tick.bind( this ));
    // }
    // update(){
    //     this.player.move( this.dir );
    //     this.player.jump();
    //     // this.camera.update();
    // }
    // move( type, dir ){
    //     switch(type) {
    //         case 'changeDir':
    //         this.dir = dir;
    //         break;
    //         case 'jump':
    //         this.player.startJump();
    //         break;
    //         case 'jumpEnd':
    //         this.player.jumpEnd();
    //         break;
    //         default:
    //         break;
    //     }
    // }
    // setModel() {
    //     requestAnimationFrame( this._tick.bind( this ));
    // }

}