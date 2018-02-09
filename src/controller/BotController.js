/* global setTimeout */
import {EventEmitter} from 'events'

export default class BotController extends EventEmitter {
    constructor(entity) {
        super();
        this.entity = entity;
        this.entity.keypress = this.keypress.bind(this);
    }

    keypress(type, timeout) {
        switch( type ) {
            case 'moveLeft':
            this.move('changeDir', 'l');
            if( !timeout ) {
                timeout = 85;
            }
            setTimeout(() => {
               this.move('changeDir', 's');
            }, timeout);
            break;
            case 'moveRight':
            this.move('changeDir', 'r');
            if( !timeout ) {
                timeout = 85;
            }
            setTimeout(() => {
               this.move('changeDir', 's');
            }, timeout);
            break;
            case 'jump':
            this.move('jump');
            if( !timeout ) {
                timeout = 85;
            }
            setTimeout(() => {
               this.move('jumpEnd');
            }, timeout);
            break;
            case 'hit':
            this.move('hit', true);
            this.move('changeDir', '');
            if( !timeout ) {
                timeout = 800;
            }
            setTimeout(() => {
               this.move('hit', false);
               this.move('changeDir', this.entity.lastDir);
            }, timeout);
            break;
            default:
            break;

        }
    }

    move( move, dir ) {
        switch(move) {
            case 'changeDir':
            this.entity.dir = dir;
            break;
            case 'down':
            this.entity.down = dir;
            break;
            case 'jump':
            this.entity.startJump();
            break;
            case 'jumpEnd':
            this.entity.endJump();
            break;
            case 'hit':
            this.entity.hit(dir);
            break;
            default:
            break;
        }
    }
}