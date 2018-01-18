import Player from './Player';
import Box from './Box';

export default class GameModel {
    constructor ( options ) {
        this.options = options;
        this.dir = null;
        this.actors = [];
        this.sceneW = this.options.width;
        this.sceneH = this.options.height;
        this.sceneX = this.options.posX;
        this.sceneY = this.options.posY;
        this.lastFrameTime = 0;
        this.playerStartX = this.sceneW / 2;
        this.playerStartY = 319;
        this.player = new Player( this );
        this.box = new Box(this, 100, 327, 60, 60);
        this.box2 = new Box(this, 800, 327, 60, 60);
        this.actors.push(this.player, this.box, this.box2);

    }
    actorTouched(actor) {
        let a1 = {},
            a2 = {};
        for(let i = 0;i < this.actors.length;i++) {
            let other = this.actors[i];
                if(actor !== other){
                a1.halfW = actor.width / 2;
                a1.halfH = actor.height / 2;
                a2.halfW = other.width / 2;
                a2.halfH = other.height / 2;

                a1.centerX = actor.posX + a1.halfW;
                a1.centerY = actor.posY + a1.halfH;
                a2.centerX = other.posX + a2.halfW;
                a2.centerY = other.posY + a2.halfH;

                let halfWidthSums = a1.halfW + a2.halfW;
                let halfHeightSums = a1.halfH + a2.halfH;

                let oX = a1.centerX - a2.centerX;
                let oY = a1.centerY - a2.centerY;
                if(Math.abs(oX) < halfWidthSums) {
                    if(Math.abs(oY) < halfHeightSums) {

                    } else {
                        
                    }
                    console.log('hit');
                    return true;
                } else {
                    // return false;
                }
            }
        }
    }
    update(){
        this.player.move( this.dir );
        this.player.jump();
        // this.actorTouched(this.player);
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