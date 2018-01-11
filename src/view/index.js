import Player from './Player';
import Stage from './Stage';
import Camera from './Camera';

const EventEmitter = require('events').EventEmitter;

export default class GameView extends EventEmitter {
    constructor ( model, element ) {
        super();
        this.element = element;
        this.model = model;
        this.player = null;
        this.dir = null;
        this.type = null;
        this.scene = new PIXI.Container();
        this.sceneW = window.innerWidth;
        this.lastFrameTime = 0;
        this.player = new Player( this );
        this.stage = new Stage( this, this.player );
        this.camera = new Camera( this , this.player );
        this.scene.position.x = 0;
        // this.char = this.player._body;
    }
    _tick( currTime ) {
        this.emit('update', currTime - this.lastFrameTime, currTime);
        this.lastFrameTime = currTime;
        this.renderer.render( this.scene );
        this.update();
        requestAnimationFrame( this._tick.bind( this ));
    }
    // cameraUpdate() {
    //     if(this.char.position.x - this.scene.position.x + 200 > this.sceneW) {
    //         console.log('stop')
    //         this.stage.move(this.dir);
    //         this.scene.position.x = (this.char.position.x - (this.sceneW - 200));
    //     } else if(this.char.position.x - 200 < this.scene.position.x){
    //         this.scene.position.x = (this.char.position.x - 200);
    //         this.stage.move(this.dir);
    //     }
    // }
    update(){
        this.player.move( this.dir );
        this.player.jump();
        this.camera.update();
        // this.stage.move( this.dir );
        // this.cameraUpdate()
    }
    move( type, dir ){
        switch(type) {
            case 'changeDir':
            this.dir = dir;
            break;
            case 'jump':
            this.player.startJump();
            break;
            case 'jumpEnd':
            this.player.jumpEnd();
            break;
            default:
            break;
        }
    }
    render() {
        this.stage.render();
        this.player.render();
        this.camera.init();
        this.renderer = PIXI.autoDetectRenderer(window.innerWidth, 500, {
            transparent: true
        });
        this.element.appendChild( this.renderer.view );
        requestAnimationFrame( this._tick.bind( this ));
    }

}