import * as PIXI from 'pixi.js';

export default class Stage {
    constructor(game) {
        this.game = game;
        this.element = null;
        this.level = new PIXI.Container();
        this.body = PIXI.Sprite.fromImage('res/images/stages/darkForest/earth.png');
        this.tree01 = PIXI.Sprite.fromImage('res/images/stages/darkForest/tree_02.png');
        this.tree01.position.x = 300;
        this.tree01.position.y = 0;
        this.bgTexture = PIXI.Texture.fromImage('res/images/stages/darkForest/bg.png');
        this.bg = new PIXI.extras.TilingSprite( this.bgTexture, this.game.sceneW, this.game.sceneH );
        // this.body = new PIXI.extras.TilingSprite( this.bodyTexture, this.game.sceneW, this.game.sceneH );
        this.body.x = 0;
        this.body.y = 195;
        this.level.addChild(this.bg);
        this.level.addChild(this.tree01);
        this.level.addChild(this.body);
        this.bg.tilePosition.x = 0;
        this.bg.tilePosition.y = -50;
    }

    createLayers() {

    }

    moveRight(){
        this.bg.position.x = this.game.camera.view.position.x ;
        this.bg.tilePosition.x -= 0.135;
    }

    moveLeft(){
        this.bg.position.x = this.game.camera.view.position.x ;
        this.bg.tilePosition.x += 0.135;
    }

    render(){
        this.game.scene.addChild( this.level );
    }
}