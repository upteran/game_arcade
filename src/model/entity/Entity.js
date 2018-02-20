import * as advantages from "./../advantages/";

export default class Entity {

    static Create (game, props, name) {
        let ent = new this(game);
        ent.name = name || props.name;
        for(let prop in props) {
            if(prop !== 'advantages') {
                ent[prop] = props[prop];
            }
        }
        ent.addAdvantages(props.advantages);
        // ent.init();
        console.log(ent)
        return ent;
    }

    constructor(game) {
        this.advantages = [];
        this.currAction = 'stop';
        this.game = game;
        this.name = null;
        this.type = null;
        this.x = null;
        this.y = null;
        this.lasDir = null;
        this.anchor = {x: 0.5, y: 0};
        this.width = null;
        this.height = null;
        this.collision = false;
    }

    addAdvantages (arr) {
        if(arr) {
            arr.forEach(({ type, ...props }) => {
                let advantage = advantages.map.find( item  => type === item.name);
                if(advantage) {
                    let createdAdvantage = advantage.Create(this, {...props}, type);
                    this.advantages.push(createdAdvantage);
                }
            })
        }

    }

    update() {
        if(this.advantages.length > 0 && this.advantages) this.advantages.forEach( a => a.tick() );
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