export default class Endgame extends Phaser.Scene {
    constructor() {
        super("endgame");
    }

    create() {
        this.add.text(150, 150, "Voce venceu!", { font: "50px 'Fredoka One'", fill: "red" });
        this.add.text(150, 200, "Voce perdeu!", { font: "50px 'Fredoka One'", fill: "blue" });
        this.add.text(150, 250, "Empate!", { font: "50px 'Fredoka One'", fill: "gray" });
        this.add.text(150, 300, "Jogador # venceu!", { font: "50px 'Fredoka One'", fill: "red" });



        this.buttonVictory = this.add.bitmapText(150, 350, "bitmap_font", "Vitoria", 30);
        this.buttonVictory.setInteractive();
        this.buttonVictory.on("pointerdown", () => {
            this.victorySound = this.sound.add("victory");
            this.victorySound.play();
        });


        this.buttonDefeat = this.add.bitmapText(250, 350, "bitmap_font", "Derrota", 30);
        this.buttonDefeat.setInteractive();
        this.buttonDefeat.on("pointerdown", () => {
            this.defeatSound = this.sound.add("defeat");
            this.defeatSound.play();
        });


        this.buttonDraw = this.add.bitmapText(150, 400, "bitmap_font", "Empate", 30);
        this.buttonDraw.setInteractive();
        this.buttonDraw.on("pointerdown", () => {
            this.drawSound = this.sound.add("draw");
            this.drawSound.play();
        });


        this.buttonClick = this.add.bitmapText(250, 400, "bitmap_font", "Clique", 30);
        this.buttonClick.setInteractive();
        this.buttonClick.on("pointerdown", () => {
            this.clickSound = this.sound.add("touch");
            this.clickSound.play();
        });


        this.add.text(150, 430, "Jogar de novo?", { font: "30px 'Titan One'", fill: "blue" });


        this.buttonRestart = this.add.bitmapText(150, 460, "bitmap_font", "Sim", 30);
        this.buttonRestart.setInteractive();
        this.buttonRestart.on("pointerdown", () => {
            // TODO - Ver melhor forma para retornar a navegação
        });

        this.buttonMenu = this.add.bitmapText(250, 460, "bitmap_font", "Nao", 30);
        this.buttonMenu.setInteractive();
        this.buttonMenu.on("pointerdown", () => {
            // TODO - Ver melhor forma para retornar a navegação
        });

    }
}