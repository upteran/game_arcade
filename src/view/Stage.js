import * as PIXI from 'pixi.js';

export default class Stage {
    constructor(game) {
        this.game = game;
        this.element = null;
        this.bodyTexture = PIXI.Texture.fromImage('res/images/stages/stageBgLong.jpg');
        this.body = new PIXI.extras.TilingSprite( this.bodyTexture, this.game.sceneW, this.game.sceneH );
        this.body.x = 0;
        this.body.y = 0;
        this.body.tilePosition.x = 0;
        this.body.tilePosition.y = 0;
    }

    move(dir){
        this.body.position.x = -this.game.scene.position.x ;
        this.body.tilePosition.x = this.game.scene.position.x;
    }

    render(){
        this.game.scene.addChild( this.body );
    }
}