import * as advantages from "./../advantages/";

export default class Entity {

    static Create (game, props, name) {
        let ent = new this(game);
        ent.name = name || props.name;
        ent.type = props.type;
        ent.x = props.x;
        ent.y = props.y;
        ent.addAdvantages(props.advantages);
        return ent;
    }

    constructor(game) {
        this.advantages = [];
        this.game = game;
        this.name = null;
        this.type = null;
        this.x = null;
        this.y = null;
        this.collision = false;
    }

    addAdvantages (arr) {
        if(arr) {
           this.advantages = arr.map(({ type, ...props }) => {
                let advantage = advantages.map.find( item  => type === item.name);
                return advantage.Create(this, {...props}, type);
            })
        }

    }

    update( dir ) {
        this.advantages.forEach( a => a.tick( dir ) );
        let collision = this.game.actorTouched(this);
        if(collision) {
            this.collision = true;
            this.touchedAt(collision);
        } else {
            this.collision = false;
        }
    }

    touchedAt(collision) {
        // let actor = collision.other,
        //     side = collision.side,
        //     offset = collision.offset;
    }

    remove() {
        this.isDeath = true;
        this.game.actors = this.game.actors.filter(item => item !== this);
    }
}