/*global requestAnimationFrame*/
import * as utils from './../utils';
import {EventEmitter} from 'events'

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
            down = utils.keypress(40),
            space = utils.keypress(32);
        right.press = () => {
            this._model.move('changeDir', 'r');
        }
        left.press = () => {
            this._model.move('changeDir', 'l');
        }
        up.press = () => {
            this._model.move('jump');
        }
        down.press = () => {
            this._model.move('down', true);
            this._model.move('changeDir', 's');
        }
        space.press = () => {
            this._model.move('changeDir', 'h');
            this._model.move('hit', true);
        }
        right.release = () => {
            this._model.move('changeDir', 's');
        }
        left.release = () => {
            this._model.move('changeDir', 's');
        }
        up.release = () => {
            this._model.move('jumpEnd');
        }
        down.release = () => {
            this._model.move('down', false);
            this._model.move('changeDir', 's');
        }
        space.release = () => {
            this._model.move('changeDir', 's');
            this._model.move('hit', false);
        }
    }
}