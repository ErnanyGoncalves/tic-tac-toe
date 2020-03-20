import GameText from "../classes/gameObject_classes/GameText";

export default class Endgame extends Phaser.Scene {
    constructor() {
        super("endgame");
    }

    init(data) {
        this.gameMode = data.mode;
        this.winner = data.winner;
    }

    create() {
        //Sons para vitoria, derrota e empate
        this.victorySound = this.sound.add("victory");
        this.defeatSound = this.sound.add("defeat");
        this.drawSound = this.sound.add("draw");

        // Styles para mensagens finais
        const styleVictoryA = { font: "50px 'Fredoka One'", fill: "blue" };
        const styleVictoryB = { font: "50px 'Fredoka One'", fill: "red" };
        const styleDefeat = { font: "50px 'Fredoka One'", fill: "red" };
        const styleDraw = { font: "50px 'Fredoka One'", fill: "gray" };

        if (this.winner === "o" && this.gameMode === "pvp") {
            this.endgameText = new GameText(this, 80, 250, "Jogador 1 venceu!", styleVictoryA, true);
            this.victorySound.play();

        } else if (this.winner === "x" && this.gameMode === "pvp") {
            this.endgameText = new GameText(this, 80, 250, "Jogador 2 venceu!", styleVictoryB, true);
            this.victorySound.play();

        } else if (this.winner === "o" && this.gameMode === "pvpc") {
            this.endgameText = new GameText(this, 145, 250, "Voce venceu!", styleVictoryA, true);
            this.victorySound.play();

        } else if (this.winner === "x" && this.gameMode === "pvpc") {
            this.endgameText = new GameText(this, 145, 250, "Voce perdeu!", styleDefeat, true);
            this.defeatSound.play();

        } else if (this.winner === "draw") {
            this.endgameText = new GameText(this, 200, 250, "Empate!", styleDraw, true);
            this.drawSound.play();

        }

        this.add.text(180, 370, "Jogar de novo?", { font: "30px 'Titan One'", fill: "blue" });

        this.buttonRestart = this.add.bitmapText(200, 460, "bitmap_font", "Sim", 40);
        this.buttonRestart.setInteractive();
        this.buttonRestart.on("pointerdown", () => {
            this.scene.start("tictactoe");
        });

        this.buttonMenu = this.add.bitmapText(330, 460, "bitmap_font", "Nao", 40);
        this.buttonMenu.setInteractive();
        this.buttonMenu.on("pointerdown", () => {
            this.scene.start("menu");
        });

    }
}