import Controller from './Controller'

export default class BotController extends Controller {

    constructor(model) {
        super(model);
        this.time = 0;

    }

    tick() {

        this.time++;

        if(this.time < 100) {

            const move = this._model.advantages.find( ({type}) => 'Moving' );
            move.action( {event: 'r'} );

        }

        if(this.time > 100 && this.time < 250) {

            const move = this._model.advantages.find( ({type}) => 'Moving' );
            move.action( {event: 's'} );

        }

        if(this.time > 250) {

            const move = this._model.advantages.find( ({type}) => 'Moving' );
            move.action( {event: 'l'} );

        }

        if(this.time > 500) {
            this.time = 0;
        }

    }

}