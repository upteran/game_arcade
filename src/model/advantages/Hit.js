import Advantage from "./Advantage";

export default class Hit extends Advantage {

    constructor(...arg) {
    	super(...arg);
        this.entity.hits = null;
        this.entity.isHiting = false;
        this.entity.isDemaged = false;
      	this.hitArea = {};
      	this.hitArea.type = this.entity.type;
        this.entity.hit = this.hit.bind(this);
    }

    nearBy(dist) {
    	if(this.entity.lastDir === 'r') {
    		this.hitArea.posX = this.entity.posX + this.entity.width  / 2 + dist;
    		this.hitArea.width = dist + this.entity.width / 2;
    		this.hitArea.anchor = this.entity.anchor;
    		this.hitArea.posY = this.entity.posY;
    		this.hitArea.height = this.entity.height;
    	} else if (this.entity.lastDir === 'l'){
    		this.hitArea.posX = this.entity.posX - dist - (this.entity.width / 4) ;
    		this.hitArea.width = dist + this.entity.width;
    		this.hitArea.anchor = this.entity.anchor;
    		this.hitArea.posY = this.entity.posY;
    		this.hitArea.height = this.entity.height;
    	}
    	let hitCollision = this.entity.game.actorTouched(this.hitArea);
    	if(hitCollision) {
    		let actor = hitCollision.other;
            if(actor.isAlive) {
            	actor.clearHit();
            	actor.vx = 0;
            	actor.isDemaged = true;
            	actor.endHit();
            }
    	}
    }

    action( {event} ) {
        this._active = event === "start";
    }

    tick() {
        if(this._active) {

        }
    }

    hit( pressed, type ) {
   		if(this.entity.isJumping) {
            return;
        }

        let currHitType = null,
            currHit = null;
        this.entity.vx = 0;
        if( pressed ) {
        	this.entity.isHiting = pressed;
            if(!type) type = 'combo';
            currHit = this.entity.hits.filter(e => type === e.type);
            if(this.entity.down) {
                currHitType = 'comboDown';
            } else {
                currHitType = currHit[0].type;
            }
            this.entity.currAction = currHitType;
        	this.nearBy(currHit[0].dist);
        } else {
            this.entity.isHiting = pressed;
            this.entity.currAction = 'stop';
        }
        // console.log(this.entity.isHiting + this.entity.type)
    }


}