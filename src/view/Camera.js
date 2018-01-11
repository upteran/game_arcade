export default class Canera {
    constructor(game, player) {
        this.game = game;
        this.player = player._body;
        this.body = new PIXI.Graphics();
        this.body.beginFill(0, 0.1);
        this.body.drawRect(0, 0, this.game.sceneW / 2, 500);
        this.body.endFill();
        this.body.position.x = this.game.scene.position.x - this.player.position.x;
        this.body.pivot.x = this.player.position.x;
    }
    update(){
        this.body.pivot.x = -this.player.position.x;
        if(this.player.position.x - this.game.scene.position.x > this.game.sceneW) {
            console.log('stop')
            // this.stage.move(this.dir);
            // this.body.position.x += 5;
        } else if(this.player.position.x < this.game.scene.position.x){
            // this.body.position.x -= 5;
            // this.stage.move(this.dir);
        }
    }
    init(){
        this.game.scene.addChild( this.body );
    }
}