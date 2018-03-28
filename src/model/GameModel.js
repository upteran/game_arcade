import Player from './entity/Player';
import Environment from './entity/Environment';
// import Entity from './entity/Entity';
import Enemy from './entity/enemy/Enemy';
import maps from './../maps/data.json';


const gameMap = maps.game;
const playerMap = maps.player;

export default class GameModel {

    constructor ( options ) {
        this.options = options;
        this.dir = 's';
        this.actors = [];
        this.sceneW = this.options.width;
        this.sceneH = this.options.height;
        this.sceneX = this.options.posX;
        this.sceneY = this.options.posY;
        this.lastFrameTime = 0;
        this.builder = new Builder(gameMap);
        this.player = Player.Create( this , playerMap );
        this.gameModels = this.builder.build( this );
        this.actors.push(this.player, ...this.gameModels);
        this.status = 'play';
    }

    actorTouched(actor, exceptions) {
        var a1 = {},
            a2 = {},
            side = 'none',
            touchedData = {},
            offset;
        for(let i = 0;i < this.actors.length;i++) {
            let other = this.actors[i];
                if( actor !== other && actor.type !== other.type
                    && actor.type !== other.parentType
                    && actor.parentType !== other.type){
                a1.halfW = actor.width / 2;
                a1.halfH = actor.height / 2;
                a1.xAnchorOffset = actor.width * actor.anchor.x;
                a1.yAnchorOffset = actor.height * actor.anchor.y;
                a2.halfW = other.width / 2;
                a2.halfH = other.height / 2;
                a2.xAnchorOffset = other.width * other.anchor.x;
                a2.yAnchorOffset = other.width * other.anchor.y;

                a1.centerX = actor.x + a1.halfW - a1.xAnchorOffset;
                a1.centerY = (actor.y - actor.height) + a1.halfH - a1.yAnchorOffset;
                a2.centerX = other.x + a2.halfW - a2.xAnchorOffset;
                a2.centerY = (other.y - other.height) + a2.halfH - a2.yAnchorOffset;

                let halfWidthSums = (a1.halfW) + (a2.halfW);
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
        if(this.actors.length !== 0) {
            for( let i = 0; i < this.actors.length; i++) {
                this.actors[i].update();
            }
        }
    }

}

class Builder {
    constructor(map, game) {
        this.map = map;
    }
    build(game) {
        let res = this.map.map(({ ...props }) => {
            if( props.type === 'environment') {
                return Environment.Create(game, props);
            }
            else if( props.type === 'enemy') {
                return Enemy.Create(game, props);
            }
        });
        return res;
    }
}

// class Builder {
//     constructor(map, game) {
//         this.map = map;
//     }
//     build(game) {
//         let builded = this.map.reduce(( result, entities ) => {
//             for( let i in entities ) {
//                 let entityMap = entities[i].map(( { ...props } ) => {
//                     if( props.type === 'environment') {
//                         return Environment.Create(game, props);
//                     }
//                     else if( props.type === 'enemy') {
//                         return Enemy.Create(game, props);
//                     }
//                 });
//                 return [...result, ...entityMap]
//             }
//         }, 0);
//         return builded;
//     }
// }