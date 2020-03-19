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

        this.loader.systems.events.on('load', (file) => {
            console.log('File loaded!', file);
        });

        this.loader.load().then(() => {

            this.add.text(20, 20, "Menu!!!", { font: "25px 'Fredoka One'", fill: "red" });

            this.ttt_x = this.add.sprite(200,200,"x");

            // https://photonstorm.github.io/phaser3-docs/Phaser.Types.Animations.html#.GenerateFrameNames__anchor
            // https://phaser.discourse.group/t/texture-atlas-anim-issue-with-generateframenumbers/1264/2   
            // Acredito que generateFrameNames pega pelo json os "nomes dos arquivos" que compõe o spridesheet e gera os frames

            this.anims.create({
                key:"x_clicked",
                frames: this.anims.generateFrameNames("x"),
                frameRate:20,
                repeat:0
            });

            this.ttt_x.play("x_clicked");

            this.ttt_o = this.add.sprite(300,300,"o");

            this.anims.create({
                key:"o_clicked",
                frames: this.anims.generateFrameNames("o"),
                frameRate:20,
                repeat:0
            });

            this.ttt_o.play("o_clicked");


            setTimeout(() => {
                this.scene.start("tictactoe");
            }, 1500);
        });
    }
}