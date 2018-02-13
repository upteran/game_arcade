import Controller from "./controller"

export default class BotController extends Controller {

    constructor(model, view) {
        super(model, view);

        this.time = 0;

    }

    tick() {

        this.time++;

        if(this.time === 100) {

            const move = this._model.advantages.find( ({type}) => "move" );
            move.action( {type: "left"} );

        }

        if(this.time === 120) {

            const move = this._model.advantages.find( ({type}) => "move" );
            move.action( {type: "stop"} );

        }

    }

}