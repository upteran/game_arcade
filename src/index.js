import GameView from './view';
import GameModel from './model';
import Controller from './controller';
// import Loader from './controller/Loader';



// old
const loader = require('./controller/Loader');

const model = new GameModel();
const view = new GameView(model);
const gameController = new Controller( model, view, document.body );
// const game = new GameView( document.body );
loader.load(() => {
    gameController.init();
});





