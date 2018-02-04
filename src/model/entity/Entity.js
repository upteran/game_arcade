import * as advantages from "./../advantages/";

export default class Entity {
    static Create (game, props) {
        let ent = new this(game);
        ent.props.push(props);
        ent.name = ent.props[0].name;
        ent.type = ent.props[0].type;
        ent.x = ent.props[0].x;
        ent.y = ent.props[0].y;
        ent.addAdvantages();
        return ent;
    }
    
    constructor(game) {
        this.props = [];
        this.advantages = [];
        this.game = game;
        this.name = null;
        this.type = null;
        this.x = null;
        this.y = null;
        this.collision = false;
    }

    addAdvantages () {
        this.advantages = this.props[0].advantages.map(({ type, ...props }) => {
            let advantage = advantages.map.find( item  => type === item.name);
            return advantage.Create(this, {...props});
        })
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
        let actor = collision.other,
            side = collision.side,
            offset = collision.offset;     
    }

    remove() {
        this.isDeath = true;
        this.game.actors = this.game.actors.filter(item => item !== this);
    }
}