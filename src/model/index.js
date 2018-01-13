import Player from './Player';

export default class GameModel {
    constructor ( options ) {
        this.options = options;
        this.dir = null;
        this.sceneW = this.options.width;
        this.sceneH = this.options.height;
        this.sceneX = this.options.posX;
        this.sceneY = this.options.posY;
        this.lastFrameTime = 0;
        this.playerStartX = this.sceneW / 2;
        this.playerStartY = 354;
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