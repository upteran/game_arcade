import Player from './Player';

export default class GameModel {
    constructor ( element ) {
        this.element = element;
        this.dir = null;
        this.sceneW = window.innerWidth;
        this.sceneH = window.innerHeight;
        this.sceneX = 0;
        this.sceneY = 0;
        this.lastFrameTime = 0;
        this.player = new Player( this );
    }
    update(){
        this.player.move( this.dir );
        this.player.jump();
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

}