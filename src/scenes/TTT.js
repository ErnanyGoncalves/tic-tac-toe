export default class TTT extends Phaser.Scene {
    constructor() {
        super("tictactoe");
    }


    create() {
        this.add.text(30, 30, "GAME!", { font: "25px 'Titan One'", fill: "red" });


        this.add.image(0, 0, 'board').setOrigin(0,-0.25);

        this.buttonStart = this.add.bitmapText(50,50,"bitmap_font","1234567890ABCDEabcde",40);

        setTimeout(() => {
            this.scene.start("endgame");
        }, 1500);
    }

}