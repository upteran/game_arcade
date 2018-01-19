import * as PIXI from 'pixi.js';
import Player from './Player';
import Stage from './Stage';
import Camera from './Camera';
import Box from './Box';

export default class GameView {
    constructor ( model, element ) {
        this.element = element;
        this._model = model;
        this.entities = [];
        this.scene = new PIXI.Container();
        // this.stage = new PIXI.extras.TilingSprite( this.stageBody, this.sceneW, 500 );
        // this.player = new Player( this, this._model.player );
        this.scene.position.x = this._model.sceneX || 0;
        this.scene.position.y = this._model.sceneY || 0;
        this.sceneW = this._model.sceneW;
        this.sceneH = this._model.sceneH;
        // create game views
        this.stage = new Stage( this );
        this.player = new Player( this, this._model.player );
        this.camera = new Camera( this, this.player, this.stage );
        this.box = new Box( this, this._model.box );
        this.box2 = new Box( this, this._model.box2 );
        this.box3 = new Box( this, this._model.box3 );
        this.box4 = new Box( this, this._model.box4 );
        this.box5 = new Box( this, this._model.box5 );
        this.box6 = new Box( this, this._model.box6 );
        this.box7 = new Box( this, this._model.box7 );
        this.renderer = PIXI.autoDetectRenderer(this.sceneW, this.sceneH, {
            transparent: true
        });
        this.entities.push( this.stage,
                            this.player,
                            this.camera,
                            this.box,
                            this.box2,
                            this.box3,
                            this.box4,
                            this.box5,
                            this.box6,
                            this.box7
                            );
        this.element.appendChild( this.renderer.view );
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