import WebpackLoader from "phaser-webpack-loader";
import AssetManifest from "../AssetManifest";

export default class Menu extends Phaser.Scene {
    constructor() {
        super("menu");
    }

    preload() {
        this.load.scenePlugin("WebpackLoader", WebpackLoader, "loader", "loader");
    }

    create() {
        this.loader.start(AssetManifest);

        this.loader.load().then(() => {

            this.add.text(20, 20, "Menu!!!", {font:"25px Arial",fill:"red"});

            this.loader.systems.events.on('load', (file) => {
                console.log('File loaded!', file);
            });

            setTimeout(() => {
                this.scene.start("tictactoe");
            }, 1500);
        });
    }
}