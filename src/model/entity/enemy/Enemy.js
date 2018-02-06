/* global setTimeout , clearTimeout*/
import Entity from './../Entity';
import BotController from './../../../controller/BotController';

export default class Enemy extends Entity {
    constructor(game, props) {
        super(game, props);
        this.controller = new BotController(this);
        this.distance = 100;
    }

    update() {
        super.update();
        if(this.posX === (this.x + this.distance)) {
            this.dir = 'l';
        } else if (this.posX === this.x) {
            this.dir = 'r';
        }
    }
    
    touchedAt(collision){
        let actor = collision.other,
            side = collision.side,
            offset = collision.offset;
        if(actor.type === 'player') {
            switch(side) {
                case 'left':
                this.controller.keypress('hit');
                actor.posX += offset;
                break;
                case 'right':
                this.controller.keypress('hit');
                actor.posX -= offset;
                break;
                default:
                break;
            }
        }
    }

}