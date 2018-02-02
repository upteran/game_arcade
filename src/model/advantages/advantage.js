export default class Advantage {
    static Create (entity, props) {
        let res = new this(entity, props);
        return res;
        // res.props.push(props);
    }
    constructor(entity) {
        this.entity = entity;
        this.type = null;
        this.props = [];
    }

    action(dir) {}
    tick( prop ) {
        this.action( prop );
    }

}