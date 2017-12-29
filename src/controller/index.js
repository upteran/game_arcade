export default class GameController {
    constructor(model, view, element ) {
        this.element = element;
        this._model = model;
        this._view = view;
        this.scene = null;
        this.init();

    }
    init() {
        this.scene = document.createElement('canvas');
        this.scene.id = 'gameScene';
        this.width = window.innerWidth;
        this.height = 500;
        this.element.appendChild( this.scene );
        this._view.render();
    }
    moveControll(){
        window.addEventListener('keydown', (e) => {
            switch(e.keyCode) {
                case 37: //left
                this._model.changeDir('l');
                console.log('left');
                break;
                case 38: //up
                // this._model.changeDir();
                console.log('up');
                break;
                case 39: //right
                this._model.changeDir('r');
                console.log('right');
                break;
                case 40: //bottom
                // this._model.changeDir();
                console.log('bottom');
                break;
            }
        });
        window.addEventListener('keyup', (e) => {
            this._model.changeDir( null );
        });
    }
}