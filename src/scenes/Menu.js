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
            

            this.add.text(120, 250, "Jogo da Velha!", { font: "50px 'Fredoka One'", fill: "red" });
            this.add.text(100, 350, "Escolha o modo de jogo:", { font: "30px 'Titan One'", fill: "blue" });

            this.buttonStartPVP = this.add.bitmapText(150, 420, "bitmap_font", "Jogador contra Jogador", 30);
            this.buttonStartPVP.setInteractive();
            this.buttonStartPVP.on("pointerdown", () => {
                this.scene.start("tictactoe", {mode: "pvp"});
            });


            this.buttonStartPVPC = this.add.bitmapText(130, 460, "bitmap_font", "Jogador contra Computador", 30);
            this.buttonStartPVPC.setInteractive();
            this.buttonStartPVPC.on("pointerdown", () => {
                // this.scene.start("tictactoe", {mode: "pvpc"});
            });
        });
    }
}