import Enemy from './Enemy';
import Entity from './../Entity';

export default class HypnoWorm extends Enemy {
    constructor(...arg) {
        super(...arg);
    }
    update( dir ){
        super.update( dir );
    }
}