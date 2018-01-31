import Entity from './Entity';

export default class HitArea extends Entity {
    constructor(game, props) {
        super(game, props);
        this.player = props;
        this.name = 'hit';
        this.type = 'area';
        this.moveType = 'static';
        this.height = this.player.height;
        this.width = 20;
        this.posX = this.player.posX;
        this.posY = this.player.posY;
    }
    update(){
        super.update();
        this.move();
        // this.hitHandler();
    }

    move() {
        if(this.player.dir === 'r' || this.player.lastDir === 'r') {
            this.posX = this.player.posX - this.width / 2 + this.player.width / 2;
        } else {
            this.posX = this.player.posX - this.width / 2 - this.player.width / 2;
        }

        this.posY = this.player.posY;
    }

    hitHandler() {
        if(this.player.isHited) {
            this.width = this.player.width / 2;
            this.height = this.player.height;
        } else {
            this.width = 0;
            this.height = 0;
        }
    }

    touchedAt(collision) {
        let actor = collision.other,
            side = collision.side,
            offset = collision.offset;
            console.log('hit')
        if(actor.type !== 'player') {
            console.log('hiiit')
        }
        if(actor.type === 'box') {
                console.log('player hit box');
        }
        if(actor.type === 'enemy') {
            console.log('player hit enemy');
        }
    }
}