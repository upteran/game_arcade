/* global setTimeout, clearTimeout */
import Advantage from "./Advantage";

export default class Destroyable extends Advantage {

    constructor(...arg) {
        super(...arg);
        this.entity.isAlive = true;
        this.entity.isDemaged = false;
        this.health = null;
        this.hurtTime = null;
    }

    action({event}) {
        if( event === 'hited') {
            this.entity.isDemaged = true;
            this.hurtTime = 0;
        }

    }

    tick () {
        if(this.entity.isDemaged && this.hurtTime < 80) {
            this.hurtTime++;
            console.log("hurt")
            this.entity.currAction = 'hurt';
            if(this.hurtTime === 80) {
                this.entity.currAction = 'default';
                this.entity.isDemaged = false;
            }
        }
    }

}