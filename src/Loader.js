import * as PIXI from 'pixi.js';

export default class Loader {
    constructor() {
        this.callback = null;
        this.assetsLoader = PIXI.loader;
        this.assetsLoader.add('player', 'res/images/player.json');
        this.assetsLoader.add('res/images/stageBg.png');
        this.assetsLoader.add('lumpi', 'res/images/lumpi.json');
        this.assetsLoader.add('hypnoWorm', 'res/images/hypnoWorm.json');
        this.assetsLoader.add('box', 'res/images/box.json');
        this.assetsLoader.once('complete', this.onImageLoader.bind( this ));
    }
    load(callback) {
        this.callback = callback;
        this.assetsLoader.on('progress', this.loading);
        this.assetsLoader.load(this.loadEnd);
    }
    loading() {
        console.log('loading res');
    }
    loadEnd(){
        console.log('loading end')
    }
    onImageLoader() {
        this.callback();
    }
}

