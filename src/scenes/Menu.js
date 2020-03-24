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

            //Animações
            this.anims.create({
                key: "o_clicked",
                frames: this.anims.generateFrameNames("o"),
                frameRate: 20,
                repeat: 0
            });
            this.anims.create({
                key: "x_clicked",
                frames: this.anims.generateFrameNames("x"),
                frameRate: 20,
                repeat: 0
            });

            this.add.text(120, 250, "Jogo da Velha!", { font: "50px 'Fredoka One'", fill: "red" });
            this.add.text(100, 350, "Escolha o modo de jogo:", { font: "30px 'Titan One'", fill: "blue" });

            this.buttonStartPVP = this.add.bitmapText(150, 420, "bitmap_font", "Jogador contra Jogador", 30);
            this.buttonStartPVP.setInteractive();
            this.buttonStartPVP.on("pointerdown", () => {
                this.scene.start("tictactoe", { mode: "pvp" });
            });


            this.buttonStartPVPC = this.add.bitmapText(100, 460, "bitmap_font", "Jogador contra Computador (Facil)", 30);
            this.buttonStartPVPC.setInteractive();
            this.buttonStartPVPC.on("pointerdown", () => {
                this.scene.start("tictactoe", { mode: "pvpc", dificulty: "easy" });
            });

            this.buttonStartPVPC = this.add.bitmapText(85, 500, "bitmap_font", "Jogador contra Computador (Normal)", 30);
            this.buttonStartPVPC.setInteractive();
            this.buttonStartPVPC.on("pointerdown", () => {
                this.scene.start("tictactoe", { mode: "pvpc", dificulty: "normal" });
            });

            this.buttonStartPVPC = this.add.bitmapText(95, 540, "bitmap_font", "Jogador contra Computador (Dificil)", 30);
            this.buttonStartPVPC.setInteractive();
            this.buttonStartPVPC.on("pointerdown", () => {
                this.scene.start("tictactoe", { mode: "pvpc", dificulty: "hard" });
            });
        });
    }
}