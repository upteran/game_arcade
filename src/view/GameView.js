import * as PIXI from 'pixi.js';
// import HitArea from './entity/HitArea';
import Stage from './Stage';
import Camera from './Camera';
import Entity from './entity/Entity';
const win = window;

export default class GameView {
    constructor ( model, element ) {
        this.element = element;
        this._model = model;
        this.entitiesModels = this.setModels(this._model.gameModels);
        this.entities = [];
        this.scene = new PIXI.DisplayObjectContainer();
        this.scene.position.x = this._model.sceneX || 0;
        this.scene.position.y = this._model.sceneY || 0;
        // this.sceneW = this._model.sceneW;
        // this.sceneH = this._model.sceneH;
        // this.scene.scale.x = this.scene.scale.y = win.innerWidth / this._model.sceneW;
        // this.scene.scale.y = win.innerHeight / this._model.sceneH;
        this.ratio = win.innerWidth / this._model.sceneW;
        this.sceneW = this._model.sceneW;
        this.sceneH = this._model.sceneH;
        // this.scene.scale.x = this.scene.scale.y = this.ratio;
        // this.scene.scale.x = this.scene.scale.y;
        // create game views
        this.stage = new Stage( this );
        this.player = Entity.Create( this, this._model.player );
        this.camera = new Camera( this, this.player, this.stage );
        this.entities.push(this.stage,
                           this.camera,
                           this.player,
                           ...this.entitiesModels
                           );
        this.renderer = PIXI.autoDetectRenderer(this.sceneW * this.ratio, this.sceneH * this.ratio, {
            transparent: true
        });

        // this.renderer.resize
        this.element.appendChild( this.renderer.view );
    }

    setModels( models ) {
        return models.map(( model ) => {
            return new Entity(this, model);
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