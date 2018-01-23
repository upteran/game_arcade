import Player from './Player';
import Box from './Box';
import Lumpi from './enemy/Lumpi';


const map = [

    {
        type: "box",
        x: 10,
        y: 122
    },

    {
        onevent: "sfdsdf",
        type: "box",
        x: 10,
        y: 122
    }

];

class Factory {

    constructor(props) {
        this.props = props;
    }

    createBox(props) {
        return new Box(props);
    }

    createEnem(props) {
        return new Enem(props);
    }

}

class Builder {

    constructor(map) {

    }

    build(factory) {

        this.map.map(({type, ...prop}) => {
            if(type === "box") {
                return new Box(props);
            }
            else if(type) {

            }
        });


        return [];
    }

}



export default class GameModel {
    constructor ( options ) {
        this.options = options;
        this.dir = null;
        this.actors = [];
        this.sceneEarthY = 386;
        this.sceneW = this.options.width;
        this.sceneH = this.options.height;
        this.sceneX = this.options.posX;
        this.sceneY = this.options.posY;
        this.lastFrameTime = 0;
        this.playerStartX = this.sceneW / 2;
        this.playerStartY = this.sceneEarthY;
        this.player = new Player( this );
        this.lumpi = new Lumpi( this , 'lumpi', 300, this.sceneEarthY, 28, 45, 'enemy');
        this.box = new Box(this, 100, this.sceneEarthY, 50, 50);
        this.box2 = new Box(this, 800, this.sceneEarthY, 40, 40);
        this.box3 = new Box(this, 200, this.sceneEarthY - 100, 30, 30);
        this.box4 = new Box(this, 230, this.sceneEarthY - 100, 30, 30);
        this.box5 = new Box(this, 260, this.sceneEarthY - 100, 30, 30);
        this.box6 = new Box(this, 290, this.sceneEarthY - 100, 30, 30);
        this.box7 = new Box(this, 480, this.sceneEarthY - 40, 30, 30, true);
        this.actors.push( this.player,
                          this.box,
                          this.box2,
                          this.box3,
                          this.box4,
                          this.box5,
                          this.box6,
                          this.box7,
                          this.lumpi );

    }
    actorTouched(actor) {
        var a1 = {},
            a2 = {},
            side = 'none',
            touchedData = {},
            offset;
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
                        let overlapX = halfWidthSums - Math.abs(oX);
                        let overlapY = halfHeightSums - Math.abs(oY);
                        if(overlapX >= overlapY) {
                            offset = overlapY;
                            if(oY > 0) {
                                side = 'top';
                            } else {
                                side = 'bottom';
                            }
                        } else {
                            offset = overlapY;
                            if(oX > 0) {
                                side = 'right';
                            } else {
                                side = 'left';
                            }
                        }
                        touchedData = Object.assign({}, {other}, {side}, {offset})
                        return touchedData;
                    }
                }
            }
        }
    }
    update(){
        this.player.move( this.dir );
        if(this.actors.length !== 0) {
            for( let i = 1; i < this.actors.length; i++) {
                this.actors[i].update();
            }
        }
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
            case 'hit':
            this.player.hit(dir);
            break;
            default:
            break;
        }
    }

}