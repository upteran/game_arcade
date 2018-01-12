import * as utils from './../utils';
const EventEmitter = require('events').EventEmitter;

export default class GameController extends EventEmitter {
    constructor(model, view, element ) {
        super();
        this.element = element;
        this._model = model;
        this._view = view;
        this.scene = null;
    }
    init() {
        this._view.render();
        this.moveControll();
        requestAnimationFrame( this._tick.bind( this ));

    }
    _tick( currTime ) {
        this.emit('update', currTime - this.lastFrameTime, currTime);
        this.lastFrameTime = currTime;
        this._model.update();
        this._view.update();
        requestAnimationFrame( this._tick.bind( this ));
    }
    moveControll() {
        let left = utils.keypress(37),
            up = utils.keypress(38),
            right = utils.keypress(39),
            down = utils.keypress(40);
        right.press = () => {
            console.log('right press');
            this._model.move('changeDir', 'r');
        }
        left.press = () => {
            console.log('left press');
            this._model.move('changeDir', 'l');
        }
        up.press = () => {
            console.log('up press');
            this._model.move('jump');
        }
        right.release = () => {
            console.log('right release');
            this._model.move('changeDir', 's');
        }
        left.release = () => {
            console.log('left release');
            this._model.move('changeDir', 's');
        }
        up.release = () => {
            console.log('up release');
            this._model.move('jumpEnd');
        }
    }
}