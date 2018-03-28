import * as PIXI from 'pixi.js';
import maps from './../maps/data.json';

class BuildLayers {
    constructor(map) {
        this.map = map;
    }

    build(res) {
        return this.map.layers.map(( layer ) => {
            let created = {};
            created.name = layer.name;
            if(layer.type === 'tile') {
                created.texture = new PIXI.Texture(res[layer.name].texture);
                created.texture.x = layer.x;
                created.texture.y = layer.y;
                created.renderItem = new PIXI.extras.TilingSprite( created.texture, 500, 300 )
                created.renderItem.tilePosition = layer.tilePosition;
            }
            else if (layer.type === 'static') {
                created.renderItem = new PIXI.Sprite(res[layer.name].texture);
                created.renderItem.x = layer.x;
                created.renderItem.y = layer.y;
            }
            return created;
        });
    }
}
export default class Stage {
    constructor(game) {
        this.game = game;
        this.element = null;
        this.res = PIXI.loader.resources;
        this.levelName = 'dark_forest';
        this.level = new PIXI.Container();
        this.layersBuilder = new BuildLayers(maps);
        this.layers = this.layersBuilder.build(this.res);
        this.createLayers(this.layers);


        // this.body = PIXI.Sprite.fromImage('res/images/stages/darkForest/earth.png');
        // this.tree01 = PIXI.Sprite.fromImage('res/images/stages/darkForest/tree_02.png');
        // this.tree01.position.x = 300;
        // this.tree01.position.y = 0;
        // this.bgTexture = PIXI.Texture.fromImage('res/images/stages/darkForest/bg.png');
        // console.log(this.bgTexture)
        // this.bg = new PIXI.extras.TilingSprite( this.bgTexture, this.game.sceneW, this.game.sceneH );
        // // this.body = new PIXI.extras.TilingSprite( this.bodyTexture, this.game.sceneW, this.game.sceneH );
        // this.body.x = 0;
        // this.body.y = 195;
        // console.log(this.bg)
        // this.level.addChild(this.bg);
        // this.level.addChild(this.tree01);
        // this.level.addChild(this.body);
        // this.bg.tilePosition.x = 0;
        // this.bg.tilePosition.y = -50;
    }

    createLayers( layers ) {
        layers.forEach((layer) => {
            console.log(layer);
            this.level.addChild(layer.renderItem);
        })
    }

    moveRight(){
        let bg = this.layers.find(({ name }) => name === `${this.levelName}_bg`);
        bg.renderItem.x = this.game.camera.view.position.x;
        bg.renderItem.tilePosition.x -= 0.135;

        // this.bg.position.x = this.game.camera.view.position.x;
        // this.bg.tilePosition.x -= 0.135;
    }

    moveLeft(){
        let bg = this.layers.find(({ name }) => name === `${this.levelName}_bg`);
        bg.renderItem.x = this.game.camera.view.position.x;
        bg.renderItem.tilePosition.x += 0.135;
        // this.bg.position.x = this.game.camera.view.position.x;
        // this.bg.tilePosition.x += 0.135;
    }

    render(){
        this.game.scene.addChild( this.level );
    }
}