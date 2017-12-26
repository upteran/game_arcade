
export default class Controller {
    constructor(model, view) {
        this._model = model;
        this._view = view;

        let _this = this;
    }
    moveControll(){
        window.addEventListener('keydown', (e) => {
            switch(e.keyCode) {
                case 37: //left
                console.log('left');
                break;
                case 38: //up
                console.log('up');
                break;
                case 39: //right
                console.log('right');
                break;
                case 40: //bottom
                console.log('bottom');
                break;
            }
        });
    }
}