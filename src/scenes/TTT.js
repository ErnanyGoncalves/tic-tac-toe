export default class TTT extends Phaser.Scene {
    constructor() {
        super("tictactoe");
    }

    create() {
        this.add.text(30,30,"GAME!",{font:"25px Arial",fill:"red"});

        
        // this.background = this.add.tileSprite(0, 0, 600, 600, "board");
        // this.background.setOrigin(0, 150);
        this.add.image(0, 0, 'board').setOrigin(0,-0.25);
        setTimeout(() => {
            this.scene.start("endgame");
        }, 1500);
    }
    
}