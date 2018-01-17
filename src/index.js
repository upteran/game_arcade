/*global window, document*/
import GameView from './view';
import GameModel from './model';
import Controller from './controller';
import Loader from './Loader';

const loader = new Loader();
const body = document.body;
const gameOptions = {
	width: window.innerWidth,
	height: 500,
	posX: 0,
	posY: 0
};

loader.load(() => {
    const model = new GameModel(gameOptions);
    const view = new GameView(model, body);
    const gameController = new Controller( model, view );
    gameController.init();
});





