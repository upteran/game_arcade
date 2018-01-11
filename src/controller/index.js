export default class GameController {
    constructor(model, view, element ) {
        this.element = element;
        this._model = model;
        this._view = view;
        this.scene = null;
    }
    init() {
        this._view.render();
        this.moveControll();

    }
    moveControll() {
        let left = this.keypress(37),
            up = this.keypress(38),
            right = this.keypress(39),
            down = this.keypress(40);
        right.press = () => {
            console.log('right press');
            this._view.move('changeDir', 'r');
        }
        left.press = () => {
            console.log('left press');
            this._view.move('changeDir', 'l');
        }
        up.press = () => {
            console.log('up press');
            this._view.move('jump');
        }
        right.release = () => {
            console.log('right release');
            this._view.move('changeDir', 's');
        }
        left.release = () => {
            console.log('left release');
            this._view.move('changeDir', 's');
        }
        up.release = () => {
            console.log('up release');
            this._view.move('jumpEnd');
        }
    }
    keypress( keyCode ){
        let key = {};
        key.code = keyCode;
        key.isDown = false;
        key.isUp = true;
        key.press = undefined;
        key.release = undefined;
        key.downHandler = e => {
            if(e.keyCode === key.code) {
                if(key.isUp && key.press) key.press();
                key.isDown = true;
                key.isUp = false;
            }
            e.preventDefault();
        }
        key.upHandler = e => {
            if(e.keyCode === key.code) {
                if(key.isDown && key.release) key.release();
                key.isDown = false;
                key.isUp = true;
            }
            e.preventDefault();
        }
        window.addEventListener('keydown', key.downHandler.bind(key), false);
        window.addEventListener('keyup', key.upHandler.bind(key), false);

        return key;
    }
}