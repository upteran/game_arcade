import Advantage from "./Advantage";

export default class Hit extends Advantage {

    constructor(...arg) {
    	super(...arg);
        this.hits = null;
        this.hitTime = 0;
        this.isHiting = false;
        this.isDemaged = false;
      	this.hitArea = Object.create(null);
      	// this.hitArea.type = this.entity.type;
        // this.entity.hit = this.hit.bind(this);
    }

    nearBy(dist) {
    	if(this.entity.lastDir === 'r') {
    		this.hitArea.x = this.entity.x + this.entity.width  / 2 + dist;
    		this.hitArea.width = dist + this.entity.width / 2;
    		this.hitArea.anchor = this.entity.anchor;
    		this.hitArea.height = this.entity.height;
            this.hitArea.y = this.entity.y - this.entity.height;
    	} else if (this.entity.lastDir === 'l'){
    		this.hitArea.x = this.entity.x - dist - (this.entity.width / 4) ;
    		this.hitArea.width = dist + this.entity.width;
    		this.hitArea.anchor = this.entity.anchor;
            this.hitArea.height = this.entity.height;
    		this.hitArea.y = this.entity.y - this.entity.height;
    	}
        // console.log(this.hitArea)
    	let hitCollision = this.entity.game.actorTouched(this.hitArea);
    	// if(hitCollision) {
    	// 	let actor = hitCollision.other;
     //        if(actor.isAlive) {
     //        	actor.clearHit();
     //        	actor.vx = 0;
     //        	actor.isDemaged = true;
     //        	actor.endHit();
     //        }
    	// }
    }

    action( {event} ) {
        if(event === 'hit') {
            this.entity.currAction = 'combo';
            this.isHiting = true;
        } else {
            this.entity.currAction = 'default';
        }
    }

    tick() {
        this.hitTime++;
        if( this.isHiting && this.hitTime < 600) {
            this.entity.currAction = 'combo';
            this.nearBy(this.hits[0].dist);
            this.isHiting = false;
            this.hitTime = 0;
        }



        // if(this.entity.isJumping) {
        //     return;
        // }

        // let currHitType = null,
        //     currHit = null;
        // this.vx = 0;
        // if( pressed ) {
        //     this.entity.isHiting = pressed;
        //     if(!type) type = 'combo';
        //     currHit = this.entity.hits.filter(e => type === e.type);
        //     if(this.entity.down) {
        //         currHitType = 'comboDown';
        //     } else {
        //         currHitType = currHit[0].type;
        //     }
        //     this.entity.currAction = currHitType;
        //     this.nearBy(currHit[0].dist);
        // } else {
        //     this.entity.isHiting = pressed;
        //     this.entity.currAction = 'stop';
        // }
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