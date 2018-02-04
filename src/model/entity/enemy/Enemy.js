/* global setTimeout , clearTimeout*/
import Entity from './../Entity';

export default class Enemy extends Entity {
    constructor(game, props) {
        super(game, props);
    }

    update() {
        super.update();
    }

    touchedAt () {
        console.log(`touched enemy ${this.name}`);
    }
    // touchedAt(collision){
    //     let actor = collision.other,
    //         side = collision.side,
    //         offset = collision.offset;
    //     if(actor.type === 'player' && actor.isHited) {
    //         this.lastStep = this.step;
    //         this.isDemaged = true;
    //         this.step = 0;
    //         clearTimeout(this.demageTime);
    //         this.demageTime = setTimeout(() => {
    //           this.isDemaged = false;
    //           this.step = this.lastStep;
    //         }, 700)
    //         switch(side) {
    //             case 'left':
    //             this.posX -= offset;
    //             break;
    //             case 'right':
    //             this.posX += offset;
    //             break;
    //             default:
    //             break;
    //         }
    //     }
    // }

}