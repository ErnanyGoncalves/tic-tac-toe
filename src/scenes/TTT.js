export default class TTT extends Phaser.Scene {
    constructor() {
        super("tictactoe");
    }


    create() {
        this.add.text(30, 30, "GAME!", { font: "25px 'Titan One'", fill: "red" });

        this.ttt_x = this.add.sprite(200,200,"x");

            // https://photonstorm.github.io/phaser3-docs/Phaser.Types.Animations.html#.GenerateFrameNames__anchor
            // https://phaser.discourse.group/t/texture-atlas-anim-issue-with-generateframenumbers/1264/2   
            // Acredito que generateFrameNames pega pelo json os "nomes dos arquivos" que compõe o spridesheet e gera os frames

            this.anims.create({
                key:"x_clicked",
                frames: this.anims.generateFrameNames("x"),
                frameRate:20,
                repeat:0
            });

            this.ttt_x.play("x_clicked");

            this.ttt_o = this.add.sprite(300,300,"o");

            this.anims.create({
                key:"o_clicked",
                frames: this.anims.generateFrameNames("o"),
                frameRate:20,
                repeat:0
            });

            this.ttt_o.play("o_clicked");


        this.add.image(0, 0, 'board').setOrigin(0,-0.25);

        this.buttonStart = this.add.bitmapText(50,50,"bitmap_font","1234567890ABCDEabcde",40);

        setTimeout(() => {
            this.scene.start("endgame");
        }, 1500);
    }

}