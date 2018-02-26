import Controller from './Controller'

export default class EnemyController extends Controller {

    constructor(model) {
        super(model);
        this._model = model;
    }

    action({ event , dir , activeTime }) {
        const hit = this._model.advantages.find( ({type}) => type === 'Hit' );
        const move = this._model.advantages.find( ({type}) => type === 'Moving' );
        const vitality = this._model.advantages.find( ({type}) => type === 'Vitality' );

        if(event === 'hit') {
            move.action({event: 's'});
            hit.action({event: 'hit'});
            if(activeTime) {
                setTimeout(() => {
                    hit.action( {event: 'endHit'} );
                }, activeTime)
            }
        }

        if(event === 'endHit') {
            hit.action({event: 'endHit'});
        }

        if( event === 'move' && dir === 'r') {
            move.action( {event: 'r'} );
            if(activeTime) {
                setTimeout(() => {
                    move.action( {event: 's'} );
                }, activeTime)
            }
        }

        if( event === 'move' && dir === 'l') {
            move.action( {event: 'l'} );
            if(activeTime) {
                setTimeout(() => {
                    move.action( {event: 's'} );
                }, activeTime)
            }
        }

        if( event === 'stop') {
            move.action( {event: 's'} );
            if(activeTime) {
                setTimeout(() => {
                    move.action( {event: 's'} );
                }, activeTime)
            }
        }
    }

}