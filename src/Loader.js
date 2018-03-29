import * as PIXI from 'pixi.js';

export default class Loader {
    constructor() {
        this.callback = null;
        this.assetsLoader = PIXI.loader;
        this.assetsLoader.add('player', 'res/images/characters/player.json');
        this.assetsLoader.add('res/images/stages/stageBg.png');
        this.assetsLoader.add('dark_forest_bg' , 'res/images/stages/darkForest/bg.png');
        this.assetsLoader.add('dark_forest_earth', 'res/images/stages/darkForest/earth.png');
        this.assetsLoader.add('dark_forest_tree_01', 'res/images/stages/darkForest/tree_02.png');
        this.assetsLoader.add('hypnoWorm', 'res/images/enemies/hypnoWorm.json');
        this.assetsLoader.add('bigZombi', 'res/images/enemies/bigZombi.json');
        this.assetsLoader.add('box', 'res/images/box.json');
        this.assetsLoader.add('healthbar', 'res/images/interface/healthbar.json');
        this.assetsLoader.add('set', 'res/images/characters/set.json');
        this.assetsLoader.add('t', 'res/images/characters/t.json');
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

