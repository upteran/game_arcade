import Controller from './Controller'

export default class EnemyController extends Controller {

    constructor(model) {
        super(model);
        this._model = model;
        this.time = 0;
        this.isHiting = false;
        // this.initActions();
    }

    action({ event , dir }) {
        const hit = this._model.advantages.find( ({type}) => type === 'Hit' );
        const move = this._model.advantages.find( ({type}) => type === 'Moving' );
        const destroy = this._model.advantages.find( ({type}) => type === 'Destroyable' );

        if(event === 'hit') {
            move.action({event: 's'});
            hit.action({event: 'hit'});
        }

        if(event === 'endHit') {
            hit.action({event: 'endHit'});
        }

        if( event === 'move' && dir === 'r') {
            move.action( {event: 'r'} );
        }

        if( event === 'move' && dir === 'l') {
            move.action( {event: 'l'} );
        }

        if( event === 'stop') {
            move.action( {event: 's'} );
        }
    }

}