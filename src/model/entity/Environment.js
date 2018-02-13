import Entity from './Entity';

export default class Environment extends Entity {

    constructor(...arg) {
        super(...arg);
    }

    touchedAt() {
        // console.log('touch');
    }

}