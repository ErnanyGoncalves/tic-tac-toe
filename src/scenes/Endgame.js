export default class Endgame extends Phaser.Scene {
    constructor() {
        super("endgame");
    }

    init(data) {
        this.gameMode = data.mode;
        this.winner = data.winner;
    }


    create() {

        this.victorySound = this.sound.add("victory");
        this.defeatSound = this.sound.add("defeat");
        this.drawSound = this.sound.add("draw");


        console.log(this.winner);

        if (this.winner === "o" && this.gameMode === "pvp") {
            this.add.text(150, 300, "Jogador 1 venceu!", { font: "50px 'Fredoka One'", fill: "red" });
            this.victorySound.play();
        } else if (this.winner === "x" && this.gameMode === "pvp") {
            this.add.text(150, 300, "Jogador 2 venceu!", { font: "50px 'Fredoka One'", fill: "blue" });
            this.victorySound.play();
        } else if (this.winner === "o" && this.gameMode === "pvpc") {
            this.add.text(150, 150, "Voce venceu!", { font: "50px 'Fredoka One'", fill: "red" });
            this.victorySound.play();
        } else if (this.winner === "x" && this.gameMode === "pvpc") {
            this.add.text(150, 200, "Voce perdeu!", { font: "50px 'Fredoka One'", fill: "blue" });
            this.defeatSound.play();
        } else if (this.winner === "draw") {
            this.add.text(150, 250, "Empate!", { font: "50px 'Fredoka One'", fill: "gray" });
            this.drawSound.play();

        }

        this.add.text(150, 430, "Jogar de novo?", { font: "30px 'Titan One'", fill: "blue" });

        this.buttonRestart = this.add.bitmapText(150, 460, "bitmap_font", "Sim", 30);
        this.buttonRestart.setInteractive();
        this.buttonRestart.on("pointerdown", () => {
            this.scene.start("tictactoe");
        });

        this.buttonMenu = this.add.bitmapText(250, 460, "bitmap_font", "Nao", 30);
        this.buttonMenu.setInteractive();
        this.buttonMenu.on("pointerdown", () => {
            this.scene.start("menu");
        });

    }
}