import Advantage from "./Advantage";

export default class Hit extends Advantage {

    constructor(...arg) {
    	super(...arg);
        this.isHiting = null;
        this.hits = null;
        this.hitTime = 100;
      	this.hitArea = null;
        this.hitCollision = false;
    }

    nearBy(dist) {
        this.hitArea = Object.create(null);
        this.hitArea.parentType = this.entity.type;
        this.hitArea.type = 'hit';
    	if(this.entity.lastDir === 'r') {
    		this.hitArea.x = this.entity.x + this.entity.width  / 2 + dist;
    		this.hitArea.width = dist + this.entity.width / 2;
    		this.hitArea.anchor = this.entity.anchor;
    		this.hitArea.height = this.entity.height;
            this.hitArea.y = this.entity.y;
    	} else if (this.entity.lastDir === 'l'){
    		this.hitArea.x = this.entity.x - dist - (this.entity.width / 4) ;
    		this.hitArea.width = dist + this.entity.width;
    		this.hitArea.anchor = this.entity.anchor;
            this.hitArea.height = this.entity.height;
    		this.hitArea.y = this.entity.y;
    	}
    	this.hitCollision = this.entity.game.actorTouched(this.hitArea);
    	if(this.hitCollision) {
            let actor = this.hitCollision.other;
            let vitality = actor.advantages.find(({ type }) => type === 'Vitality');
            if( vitality ) {
                vitality.action({event: 'hited'});
            } else {
                return;
            }
    	}
    }

    action( {event} ) {
        let vitality = this.entity.advantages.find(({ type }) => type === 'Vitality');
        if(event === 'hit' && !vitality.isDemaged) {
            this.entity.currAction = 'combo';
            this.isHiting = true;
        } else {
            this.entity.currAction = 'default';
            this.isHiting = false;
        }
    }

    tick() {
        if( this.isHiting ) {
            this.hitTime++;
            this.nearBy(this.hits[0].dist);
        }
    }

    // hit( pressed, type ) {
   	// 	if(this.entity.isJumping) {
    //         return;
    //     }

    //     let currHitType = null,
    //         currHit = null;
    //     this.vx = 0;
    //     if( pressed ) {
    //     	this.entity.isHiting = pressed;
    //         if(!type) type = 'combo';
    //         currHit = this.entity.hits.filter(e => type === e.type);
    //         if(this.entity.down) {
    //             currHitType = 'comboDown';
    //         } else {
    //             currHitType = currHit[0].type;
    //         }
    //         this.entity.currAction = currHitType;
    //     	this.nearBy(currHit[0].dist);
    //     } else {
    //         this.entity.isHiting = pressed;
    //         this.entity.currAction = 'stop';
    //     }
    // }


}