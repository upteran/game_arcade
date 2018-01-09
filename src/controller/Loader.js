class Loader {
    constructor() {
        this.callback = null;
        this.assetsLoader = PIXI.loader;
        this.assetsLoader.add('res/images/player.png');
        this.assetsLoader.add('player', 'res/images/player.json');
        this.assetsLoader.add('res/images/stageBg.png');
        this.assetsLoader.once('complete', this.onImageLoader.bind( this ));
    }
    load(callback) {
        this.callback = callback;
        this.assetsLoader.on('progress', this.loading);
        this.assetsLoader.load(this.loadEnd);
    }
    loading() {
        console.log('loading');
    }
    loadEnd(){
        console.log('loading end')
    }
    onImageLoader() {
        this.callback();
    }
}
let loader = new Loader();
module.exports = loader;

