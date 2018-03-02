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
        this.scene = new PIXI.Container();
        // this.scene.position.x = this._model.sceneX || 0;
        // this.scene.position.y = this._model.sceneY || 0;

        // this.sceneW = this._model.sceneW;
        // this.sceneH = this._model.sceneH;
        // this.scene.scale.x = this.scene.scale.y = win.innerWidth / this._model.sceneW;
        // this.scene.scale.y = win.innerHeight / this._model.sceneH;
        this.ratio = 1.7;
        this.sceneW = this._model.sceneW;
        this.sceneH = this._model.sceneH;
        this.scene.position.x = 0;
        this.scene.position.y = 0;
        this.scene.scale.x = this.scene.scale.y = this.ratio;
        // this.scene.scale.x = this.scene.scale.y;
        // create game views
        this.player = Entity.Create( this, this._model.player );
        // this.scene.pivot.x = this.player.body.position.x;
        // this.scene.pivot.y = this.player.body.position.y;
        this.stage = new Stage( this, this._model.player );
        this.camera = new Camera( this, this.player, this.stage );
        this.entities.push(this.stage,
                           this.player,
                           this.camera,
                           ...this.entitiesModels
                           );
        console.log(this.entities)
        this.renderer = PIXI.autoDetectRenderer(this.sceneW * this.ratio, this.sceneH * this.ratio, {
            transparent: true
        });
        // this.renderer.resize
        this.element.appendChild( this.renderer.view );
    }

    setModels( models ) {
        return models.filter(( model ) => model.currAction !== 'hide').map((item) => new Entity(this, item));
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
            console.log(this.entities[i])
            this.entities[i].render();
        }
    }

}