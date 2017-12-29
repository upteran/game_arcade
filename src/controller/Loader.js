class Loader {
    constructor() {
        this.callback = null;
        this.assetsLoader = new PIXI.loaders.Loader();
        this.assetsLoader.add('res/images/player.png');
        this.assetsLoader.add('res/images/stageBg.png');
        this.assetsLoader.once('complete', this.onImageLoader.bind( this ));
    }
    load(callback) {
        this.callback = callback;
        this.assetsLoader.load();
    }
    onImageLoader() {
        this.callback();
    }
}
let loader = new Loader();
module.exports = loader;

