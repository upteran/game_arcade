import Controller from "./Controller"
const win = window;

export default class Player extends Controller {

    constructor(model) {
        super(model);
        win.addEventListener('keydown', this);
        win.addEventListener('keyup', this);
    }

    handleEvent(event) {
        /**
         * Передвижение
         */
        const move = this._model.advantages.filter( ({type}) => type === 'Moving');
        const hit = this._model.advantages.filter( ({type}) => type === 'Hit');

        if( event.keyCode === 39 ) { // right
            console.log(event.type)
            move[0].action(
                event.type === 'keydown' ? {event: 'r'} :
                    event.type === 'keyup' ? {event: 's'} : {}
            );
        }
        if( event.keyCode === 37 ) { // left
            move[0].action(
                event.type === 'keydown' ? {event: 'l'} :
                    event.type === 'keyup' ? {event: 's'} : {}
            );
        }
        if( event.keyCode === 40 ) { // down
            move[0].action(
                event.type === 'keydown' ? {event: 'down'} :
                    event.type === 'keyup' ? {event: 's'} : {}
            )
        }
        if ( event.keyCode === 38 ) { // up
            move[0].action(
                event.type === 'keydown' ? {event: 'jump'} :
                    event.type === 'keyup' ? {event: 'jumpEnd'} : {}
            )
        }

        // Стрельба
        if( event.keyCode === 32 ) {
            hit[0].action(
                event.type === "keydown" ? {event: "hit"} :
                    event.type === "keyup" ? {event: "hitEnd"} : {}
            );
        }

    }

}

    // moveControll() {
    //     let left = utils.keypress(37),
    //         up = utils.keypress(38),
    //         right = utils.keypress(39),
    //         down = utils.keypress(40),
    //         space = utils.keypress(32);
    //     right.press = () => {
    //         this._model.move('changeDir', 'r');
    //     }
    //     left.press = () => {
    //         this._model.move('changeDir', 'l');
    //     }
    //     up.press = () => {
    //         this._model.move('jump');
    //     }
    //     down.press = () => {
    //         this._model.move('down', true);
    //         this._model.move('changeDir', 's');
    //     }
    //     space.press = () => {
    //         this._model.move('changeDir', 'h');
    //         this._model.move('hit', true);
    //     }
    //     right.release = () => {
    //         this._model.move('changeDir', 's');
    //     }
    //     left.release = () => {
    //         this._model.move('changeDir', 's');
    //     }
    //     up.release = () => {
    //         this._model.move('jumpEnd');
    //     }
    //     down.release = () => {
    //         this._model.move('down', false);
    //         this._model.move('changeDir', 's');
    //     }
    //     space.release = () => {
    //         this._model.move('changeDir', 's');
    //         this._model.move('hit', false);
    //     }
    // }