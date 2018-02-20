export default class Advantage {

    static Create (entity, props, type) {
        let res = new this(entity);
        for(let prop in props) {
            res[prop] = props[prop];
        }
        res.type = type;
        if(res.init) res.init();
        return res;
    }

    constructor(entity) {
        this.entity = entity;
        this.type = null;
    }

    // action() {
    //     // console.log('parent Advantage action')
    // }

    // tick( ) {
    //     // this.action( prop );
    // }

}