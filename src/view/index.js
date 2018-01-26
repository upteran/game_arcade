import * as PIXI from 'pixi.js';
import Player from './entity/Player';
import Stage from './Stage';
import Camera from './Camera';
import Box from './entity/Box';
import Lumpi from './entity/enemy/Lumpi';

export default class GameView {
    constructor ( model, element ) {
        this.element = element;
        this._model = model;
        this.entitiesModels = this.setModels(this._model.gameModels);
        this.entities = [];
        this.scene = new PIXI.Container();
        this.scene.position.x = this._model.sceneX || 0;
        this.scene.position.y = this._model.sceneY || 0;
        this.sceneW = this._model.sceneW;
        this.sceneH = this._model.sceneH;
        // create game views
        this.stage = new Stage( this );
        this.player = new Player( this, this._model.player );
        this.camera = new Camera( this, this.player, this.stage );
        this.entities.push(this.stage,
                           this.camera,
                           this.player,
                           ...this.entitiesModels);
        this.renderer = PIXI.autoDetectRenderer(this.sceneW, this.sceneH, {
            transparent: true
        });
        this.element.appendChild( this.renderer.view );
    }
    // getModel( name ) {
    //     let findedModel = null;
    //     this.entitiesModels.forEach(( model ) => {
    //         if(model.name === name) {
    //             findedModel = model;
    //         }
    //     });
    //     return findedModel;
    // }
    setModels( models ) {
        return models.map(( model ) => {
            if(model.type === 'enemy' && model.name === 'lumpi') {
                return new Lumpi(this, model);
            }
            else if(model.type === 'box'){
                return new Box(this, model);
            }
        })
    }
    update(){
        for(let i = 0;i < this.entities.length;i++) {
            if(this.entities[i].update) {
                this.entities[i].update();
            }
        }
        this.renderer.render( this.scene );
    }
    render() {
        for(let i = 0; i < this.entities.length;i++) {
            this.entities[i].render();
        }
    }

}