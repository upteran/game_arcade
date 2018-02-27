/*global window, document*/
import GameView from './view/GameView';
import GameModel from './model/GameModel';
import Controller from './controller/Controller';
import Loader from './Loader';

const loader = new Loader();
const body = document.body;
const gameOptions = {
	width: 1000,
	height: 500,
	posX: 0,
	posY: 0
};

loader.load(() => {
    const model = new GameModel(gameOptions);
    const view = new GameView(model, body);
    const controller = new Controller( model, view );
    controller.init();
});