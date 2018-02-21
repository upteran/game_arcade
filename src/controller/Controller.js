/*global requestAnimationFrame*/
import * as utils from './../utils';
import {EventEmitter} from 'events';

export default class Controller extends EventEmitter {

    constructor( model, view ) {
        super();
        this._model = model;
        this._view = view;
    }

    init() {
        this._view.render();
        requestAnimationFrame( this._tick.bind( this ));

    }

    _tick( currTime ) {
        this.emit('update', currTime - this.lastFrameTime, currTime);
        this.lastFrameTime = currTime;
        this._model.update();
        this._view.update();
        requestAnimationFrame( this._tick.bind( this ));
    }

}