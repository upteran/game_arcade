import Advantage from "./Advantage";

export default class Destroyable extends Advantage {
    constructor(entity, props) {
        super(entity);
        this.type = 'Destroyable';
        this.entity.isDemaged = false;
        this.entity.isAlive = true;
        this.entity.health = props.health;
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
