import GameView from './view';
import GameModel from './model';
import Controller from './controller';
// import Loader from './controller/Loader';



// old
const loader = require('./controller/Loader');
const body = document.body;


loader.load(() => {
    const model = new GameModel();
    const view = new GameView(model, body);
    const gameController = new Controller( model, view );
    gameController.init();
});





