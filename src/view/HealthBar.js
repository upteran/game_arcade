import * as PIXI from 'pixi.js';
import * as utils from './../utils';

export default class HealthBar {
    constructor(game, player) {
        this.game = game;
        this.player = player;
        this.bar = new PIXI.Sprite();
        this.res = PIXI.loader.resources['healthbar'];
        this.textures = utils.textureLoader(this.res);
        this.bar.texture = this.textures['health_6'][0];
        this.bar.position.x = 10;
        this.bar.position.y = 10;
        this.bar.width = 116;
        this.bar.height = 33;
        this.bar.pivot.x = 0;
    }

    update() {
        this.bar.pivot.x = -this.game.scene.pivot.x;
        let vitality = this.player.advantages.find( ({type}) => type === 'Vitality');
        this.bar.texture = this.textures[`health_${vitality.health}`][0];
    }

    render(){
        this.game.scene.addChild( this.bar );
    }
}