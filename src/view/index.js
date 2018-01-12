import Player from './Player';
import Stage from './Stage';
import Camera from './Camera';

export default class GameView {
    constructor ( model, element ) {
        this.element = element;
        this._model = model;
        this.scene = new PIXI.Container();
        // this.stage = new PIXI.extras.TilingSprite( this.stageBody, this.sceneW, 500 );
        // this.player = new Player( this, this._model.player );
        this.scene.position.x = this._model.sceneX || 0;
        this.scene.position.y = this._model.sceneY || 0;
        this.sceneW = innerWidth;
        this.sceneH = 500;
        this.stage = new Stage( this );
        this.player = new Player( this, this._model.player );
        this.camera = new Camera( this, this.player, this.stage );
    }
    update(){
        this.player.move();
        this.player.jump();
        this.camera.update();
        this.renderer.render( this.scene );
    }
    render() {
        this.renderer = PIXI.autoDetectRenderer(window.innerWidth, 500, {
            transparent: true
        });
        this.element.appendChild( this.renderer.view );
        this.stage.render();
        this.player.render();
        this.camera.init();
    }

}