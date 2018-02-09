/* global setTimeout, clearTimeout */
import Advantage from "./Advantage";

export default class Destroyable extends Advantage {
    constructor(...arg) {
        super(...arg);
        this.health = null;
        this.entity.isDemaged = false;
        this.entity.isAlive = true;
        this.hurtTime = null;
        this.entity.clearHit = this.clearHit.bind(this);
        this.entity.endHit = this.endHit.bind(this);
    }


    clearHit () {
        clearTimeout(this.hurtTime);
    }

    endHit() {
        this.hurtTime = setTimeout(() => {
            this.entity.isDemaged = false;
            if(this.entity.type !== 'player') {
                this.entity.dir = this.entity.lastDir;
            }
        }, 800)
    }

    action () {
        if(this.entity.isDemaged) {
            this.entity.currAction = 'hurt';
        }
    }

}
