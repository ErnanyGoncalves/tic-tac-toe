export default class Endgame extends Phaser.Scene {
    constructor() {
        super("endgame");
    }


    create() {
        this.add.text(20, 20, "THE END");

        const musicConfig = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        };

        this.victorySound = this.sound.add("victory");
        this.victorySound.play(musicConfig);
    }
}