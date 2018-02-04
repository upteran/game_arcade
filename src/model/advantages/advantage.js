export default class Advantage {
    static Create (entity, props) {
        let res = new this(entity, props);
        return res;
    }
    constructor(entity) {
        this.entity = entity;
        this.type = null;
        this.props = [];
    }

    action() {}
    tick( prop ) {
        this.action( prop );
    }

}