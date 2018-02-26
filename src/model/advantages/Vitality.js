/* global setTimeout, clearTimeout */
import Advantage from "./Advantage";

export default class Vitality extends Advantage {

    constructor(...arg) {
        super(...arg);
        this.isAlive = true;
        this.isDemaged = false;
        this.health = null;
        this.HURT_FREQUENCY = 80;
        this.hurtTime = this.HURT_FREQUENCY;
        this.isImmortal = false;
    }

    action({event}) {
        if( event === 'hited' && !this.isImmortal && !this.isDemaged ) {
            this.isDemaged = true;
            this.isImmortal = true;
            this.hurtTime = 0;
        }

    }

    tick () {
        this.hurtTime++;
        if( this.isDemaged && this.hurtTime <= this.HURT_FREQUENCY ) {
            this.entity.currAction = 'hurt';
            if(this.hurtTime === this.HURT_FREQUENCY) {
                this.entity.currAction = 'default';
                this.isDemaged = false;
            }
        }

        if(this.hurtTime > 120) {
            this.isImmortal = false;
        }
    }

}