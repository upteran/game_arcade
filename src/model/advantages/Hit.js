import Advantage from "./Advantage";

export default class Hit extends Advantage {

    constructor(...arg) {
    	super(...arg);
        this.isHiting = null;
        this.hits = null;
        this.hitTime = 100;
      	this.hitArea = null;
        this.hitCollision = false;
        this.currHitType = null;
    }

    nearBy(dist) {
        this.hitArea = Object.create(null);
        this.hitArea.parentType = this.entity.type;
        this.hitArea.type = 'hit';
        this.hitArea.x = this.entity.x;
        this.hitArea.width = dist + this.entity.width;
        this.hitArea.anchor = this.entity.anchor;
        this.hitArea.height = this.entity.height;
        this.hitArea.y = this.entity.y;
    	this.hitCollision = this.entity.game.actorTouched(this.hitArea);
    	if(this.hitCollision) {
            let actor = this.hitCollision.other;
            console.log(actor)
            let vitality = actor.advantages.find(({ type }) => type === 'Vitality');
            if( vitality ) {
                vitality.action({event: 'hited'});
            } else {
                return;
            }
    	}
    }

    action( {event, type} ) {
        let vitality = this.entity.advantages.find(({ type }) => type === 'Vitality');
        if(event === 'hit' && !vitality.isDemaged) {
            this.entity.currAction = this.currHitType = (type) ? `${type}` : 'combo';
            this.isHiting = true;
        } else {
            this.entity.currAction = 'default';
            this.isHiting = false;
        }
    }

    tick() {
        if( this.isHiting ) {
            this.hitTime++;
            let hit;
            hit = this.hits.find(({ type }) => type === this.currHitType);
            this.nearBy(hit.dist);
        }
    }


}