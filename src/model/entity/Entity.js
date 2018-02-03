import * as advantages from "./../advantages/";
console.log(advantages.map)

export default class Entity {
    static Create (game, props) {
        let ent = new this(game, props);
        ent.props.push(props);
        ent.addAdvantages();
        return ent;
    }
    constructor(game, props) {
        this.props = [];
        this.advantages = [];
        this.game = game;
        this.name = props.name;
        this.x = props.x;
        this.y = props.y;
        this.anchor = {x: 0.5, y: 0};

        // this.dir = props.dir || 's';
        // this.scaleRatio = props.scale;
        // this.sourceWidth = props.width;
        // this.sourceHeight = props.height;
        // this.width = this.sourceWidth * this.scaleRatio;
        // this.height = this.sourceHeight * this.scaleRatio;
        // this.posX = props.x;
        // this.posY = props.y - this.height;
        // this.name = props.name;
        // this.type = props.type;




        // this.moveType = props.moveType;
        // this.startCharWidth = this.width;
        // this.startCharHeight = this.height;
        // this.posGameStartX = this.posX;
        // this.posGameStartY = this.posY;
        // this.posYcurr= this.posY;
        // this.anchor = {x: 0.5, y: 0};
        // this.scaleX = this.scaleRatio;
        // this.health = props.health;
        // this.gravity = 0.5;
        // this.down = false;
        // this.vx = 0;
        // this.vy = 0;
        // this.isHited = false;
        // this.currMoveType = 'stop';
        // this.isDemaged = false;
        // this.demageTime = null;
        // this.step = 1;
        // this.lastStep = this.step;
    }
    addAdvantages () {
        this.advantages = this.props[0].advantages.map(({ type, ...props }) => {
            let advantage = advantages.map.find( item  => type === item.name);
            return advantage.Create(this, {...props});
        })
    }
    update() {

        this.advantages.forEach( a => a.tick() );
        let collision = this.game.actorTouched(this);
        if(collision) this.touchedAt(collision);
        // if(this.moveType !== 'static') {
        //     this.moveY();
        // }
    }

    // startJump(vy) {
    //     if(!this.isJumping && !this.isHited) {
    //         this.vy = vy || -10;
    //         this.isJumping = true;
    //     }
    // }

    // moveY() {
    //     this.vy += this.gravity;
    //     this.posY += this.vy;
    //     if(this.vy > 8) this.vy = 8;
    //     if(this.posY > this.posYcurr) {
    //         this.posY = this.posYcurr;
    //         this.isJumping = false;
    //     }
    // }

    // jumpEnd() {
    //     if(this.vy < -5){
    //         this.vy = -5;
    //     }

    // }

    remove() {
        this.isDeath = true;
        this.game.actors = this.game.actors.filter(item => item !== this);
    }
}