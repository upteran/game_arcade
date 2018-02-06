import Advantage from "./Advantage";
import Entity from './../entity/Entity';

export default class Hit extends Advantage {
    constructor(entity, props) {
    	super(entity)
        this.type = 'Hit';
        this.hits = props.hits;
        this.entity.isHiting = false;
        this.entity.isDemaged = false;
      	this.hitArea = {};
      	this.hitArea.type = this.entity.type;
        this.entity.hit = this.hit.bind(this);
    }

    nearBy(dist) {
    	if(this.entity.lastDir === 'r' || this.entity.lastDir === 's') {
    		this.hitArea.posX = this.entity.posX + this.entity.width / 2;
    		this.hitArea.width = this.entity.width / 2 + dist;
    		this.hitArea.anchor = this.entity.anchor;
    		this.hitArea.posY = this.entity.posY;
    		this.hitArea.height = this.entity.height;
    	} else if (this.entity.lastDir === 'l' || this.entity.lastDir === 's'){
    		this.hitArea.posX = this.entity.posX - dist;
    		this.hitArea.width = dist + this.entity.width / 2;
    		this.hitArea.anchor = this.entity.anchor;
    		this.hitArea.posY = this.entity.posY;
    		this.hitArea.height = this.entity.height;
    	}
    	let hitCollision = this.entity.game.actorTouched(this.hitArea);
    	if(hitCollision) {
    		let actor = hitCollision.other,
            	side = hitCollision.side,
            	offset = hitCollision.offset;
            if(actor.isAlive) {
            	actor.clearHit();
            	actor.vx = 0;
            	actor.isDemaged = true;
            	actor.endHit();
            	
            }
    	}
    }

    hit( pressed, type) {
   		if(this.entity.isJumping) {
            return;
        }

        this.entity.vx = 0;
        if( pressed ) {
        	this.entity.isHiting = pressed;
        	this.entity.currAction = (this.entity.down) ? 'comboDown' : 'combo';
        	console.log(this.entity.currAction)
        	let currHit = this.hits.filter(e => this.entity.currAction === e.type)
        	this.nearBy(currHit[0].dist);
           
        } else {
            this.entity.isHiting = false;
            this.entity.currAction = 'stop';
        }
    }


}