export default class Endgame extends Phaser.Scene {
    constructor() {
        super("endgame");
    }

    create() {
        this.add.text(20, 20, "THE END");


        // this.victorySound = this.sound.add("victory");
        // this.victorySound.play();
    }
}