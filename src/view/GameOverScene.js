import * as PIXI from 'pixi.js';
import * as text from './../maps/text.json';

// let textStyle = {
//     fontFamily: "Arial",
//     fontSize: 36,
//     fill: "white",
//     stroke: '#ff3300',
//     strokeThickness: 4,
//     dropShadow: true,
//     dropShadowColor: "#000000",
//     dropShadowBlur: 4,
//     dropShadowAngle: Math.PI / 6,
//     dropShadowDistance: 6
// };


export default class GameOverScene {
    constructor(game) {
        this.game = game;
        this.scene = new PIXI.Container();
        this.scene.width = this.game.sceneW;
        this.scene.height = this.game.sceneH;
        this.scene.position.x = 0;
        this.scene.position.y = 0;
        this.scene.visible = false;
        this.msg = new PIXI.Text(text.lose.text);
        this.msg.position.x = (this.game.sceneW / 2);
        this.msg.position.y = (this.game.sceneH / 2);
        this.msg.style = text.lose.style;
        this.msg.anchor.set(0.5);
        this.bg = this._drawRect(0, 0, this.game.sceneW, this.game.sceneH);
        this.bg.alpha = 0;
        this.msg.alpha = 0;
        this.scene.addChild(this.bg);
        this.scene.addChild(this.msg);
    }

    _drawRect( x, y, width, height ) {
        let rect;
        rect = new PIXI.Graphics();
        rect.beginFill(0x000000);
        rect.drawRect(x, y, width, height);
        rect.endFill();
        return rect;
    }

    update() {
        this.scene.pivot.x = -this.game.scene.pivot.x;
        this.scene.visible = (this.game.state !== 'play') ? true : false;
        if(this.scene.visible && this.bg.alpha <= 1) {
            this.bg.alpha += 0.005;
            this.msg.alpha += 0.008;
        }
    }

    render() {
        this.game.scene.addChild(this.scene);
    }
}