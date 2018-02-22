import Controller from "./Controller"
const win = window;

export default class Player extends Controller {

    constructor(model) {
        super(model);
        win.addEventListener('keydown', this);
        win.addEventListener('keyup', this);
    }

    handleEvent(event) {
        //Передвижение
        const move = this._model.advantages.filter( ({type}) => type === 'Moving');

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
            const hit = this._model.advantages.filter( ({type}) => type === 'Hit');
            hit[0].action(
                event.type === "keydown" ? {event: "hit"} :
                    event.type === "keyup" ? {event: "hitEnd"} : {}
            );
        }

    }

}