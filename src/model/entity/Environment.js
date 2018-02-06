import Entity from './Entity';

export default class Environment extends Entity {
    constructor(game, props) {
        super(game, props);
    }

    touchedAt() {
        // console.log('touch');
    }
}