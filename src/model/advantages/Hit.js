import Advantage from "./Advantage";

export default class Hit extends Advantage {
    constructor(...arg) {
    	super(...arg)
        this.type = 'Hit';
        this.entity.isHiting = false;
        this.entity.hit = this.hit.bind(this);
    }

    // action() {
    // 	if(this.isJumping) {
    //         return;
    //     } else if(this.vx !== 0) {
    //         this.vx = 0;
    //         this.dir = 's';
    //     }
    //     if( dir ) {
    //         this.currMoveType = 'hit';
    //         this.isHited = dir;
    //     } else {
    //         this.isHited = false;
    //     }
    // }

    hit( flag ) {
   		if(this.entity.isJumping) {
            return;
        }
        this.entity.vx = 0;
        this.entity.dir = 's';
        if( flag ) {
            this.entity.currAction = 'hit';
            this.entity.isHiting = flag;
        } else {
            this.entity.isHiting = false;
        }
    }

}