import Controller from "./controller"
const win = window;

export default class Player extends Controller {

    constructor(model, view) {
        super(model, view);
        win.addEventListener('keydown', this);
        win.addEventListener('keyup', this);
    }

    handleEvent(event) {

        /**
         * Стрельба
         */

        const hit = this._model.advantages.filter( ({type}) => type === "hit");

        if(event.keyCode === 15) {
            hit[0].action(
                event.type === "keydown" ? {event: "start"} :
                    event.type === "keyup" ? {event: "end"} : {}
            );
        }

    }

}