export default class TTT extends Phaser.Scene {
    constructor() {
        super("tictactoe");
    }

    create() {
        this.add.text(30,30,"GAME!")
        this.background = this.add.tileSprite(0, 0, 600, 600, "board");
        this.background.setOrigin(0, -150);

        setTimeout(() => {
            this.scene.start("endgame");
        }, 1000);
    }
    
}