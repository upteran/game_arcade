/*global window, document*/
import GameView from './view/GameView';
import GameModel from './model/GameModel';
import Controller from './controller/Controller';
import PlyerController from './controller/player';
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
    const controller = new Controller( model, view );
    const playerController = new PlyerController(model.player);
    controller.init();
});