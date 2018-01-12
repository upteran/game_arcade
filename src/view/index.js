import Player from './Player';
import Stage from './Stage';
import Camera from './Camera';

const EventEmitter = require('events').EventEmitter;

export default class GameView extends EventEmitter {
    constructor ( model, element ) {
        super();
        this.element = element;
        this.model = model;
        this.dir = null;
        this.type = null;
        this.scene = new PIXI.Container();
        // this.stage = PIXI.Sprite.fromImage('res/images/stageBgLong.jpg');
        // this.stageBody = PIXI.Texture.fromImage('res/images/stageBgLong.jpg');
        // this.stage = new PIXI.extras.TilingSprite( this.stageBody, this.sceneW, 500 );
        this.sceneW = window.innerWidth;
        this.sceneH = window.innerHeight;
        this.lastFrameTime = 0;
        this.stage = new Stage( this );
        this.player = new Player( this );
        this.camera = new Camera( this, this.player, this.stage );
        this.scene.position.x = 0;
        this.char = this.player.body;
    }
    _tick( currTime ) {
        this.emit('update', currTime - this.lastFrameTime, currTime);
        this.lastFrameTime = currTime;
        this.renderer.render( this.scene );
        this.update();
        requestAnimationFrame( this._tick.bind( this ));
    }
    update(){
        this.player.move( this.dir );
        this.player.jump();
        this.camera.update();
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