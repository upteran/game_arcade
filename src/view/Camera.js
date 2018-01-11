export default class Camera {
    constructor(game, player) {
        this.game = game;
        // this.player = player._body;
        // this.body = new PIXI.Graphics();
        // this.body.beginFill(0, 0.1);
        // this.body.drawRect(0, 0, this.game.sceneW / 2, 500);
        // this.body.endFill();
        // this.body.position.x = this.game.scene.position.x - this.player.position.x;
        // this.body.pivot.x = this.player.position.x;
    }
    update( playerX, viewX, winW, marginX ){
        if( playerX - viewX + marginX > winW ) {
            console.log('stop right');
            viewX = playerX + (200 - winW);
        } else if ( playerX - 200 < viewX ) {
            console.log('stop left');
            viewX = playerX - 200;
        }
    }
    init(){
        this.game.scene.addChild( this.body );
    }
}