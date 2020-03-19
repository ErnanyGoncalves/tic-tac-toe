import game from "../index";

export default class TTT extends Phaser.Scene {

    constructor() {
        super("tictactoe");
    }


    create() {
        this.p1First = Math.floor(Math.random() * 10 + 1) > 5 ? "o" : "x";

        this.playerTurn = this.add.bitmapText(50, 40, "bitmap_font", "Vez do:", 40);

        this.showPlayer(this.p1First);

        this.input.on('pointerdown', ({ x, y }) => { //pointer.x, pointer,y
            console.log("X", x);
            console.log("Y", y);
            this.checkRegion(x, y);
        });

        this.add.image(0, 0, 'board').setOrigin(0, -0.25);

        // setTimeout(() => {
        //         this.scene.start("endgame");
        // }, 1500);


    }


    checkRegion(x, y) {

        /*
            x >= 0 x < 200; y >= 150 y < 350      x >= 200 x < 400; y >= 150 y < 350      x >= 400 x <= 600; y >= 150 y < 350
    
            x >= 0 x < 200; y >= 350 y < 550     x >= 200 x < 400; y >= 350 y < 550       x >= 400 x <= 600; y >= 350 y < 550
    
            x >= 0 x < 200; y >= 550 y <= 750      x >= 200 x < 400; y >= 550 y <= 750    x >= 400 x <= 600 0; y >= 550 y <= 750
        */

        if (x >= 0 && x < 200) {
            if (y >= 150 && y < 350) {
                console.log("A");
                this.makeAPlay(100, 250, this.p1First);

            } else if (y >= 350 && y < 550) {
                console.log("D");
                this.makeAPlay(100, 450, this.p1First);

            } else if (y >= 550 && y <= 750) {
                console.log("G");
                this.makeAPlay(100, 650, this.p1First);
            }
        } else if (x >= 200 && x < 400) {
            if (y >= 150 && y < 350) {
                console.log("B");
                this.makeAPlay(300, 250, this.p1First);

            } else if (y >= 350 && y < 550) {
                console.log("E");
                this.makeAPlay(300, 450, this.p1First);

            } else if (y >= 550 && y <= 750) {
                console.log("H");
                this.makeAPlay(300, 650, this.p1First);

            }
        } else if (x >= 400 && x <= 600) {
            if (y >= 150 && y < 350) {
                console.log("C");
                this.makeAPlay(500, 250, this.p1First);

            } else if (y >= 350 && y < 550) {
                console.log("F");
                this.makeAPlay(500, 450, this.p1First);

            } else if (y >= 550 && y <= 750) {
                console.log("I");
                this.makeAPlay(500, 650, this.p1First);

            }
        }

        this.p1First = this.p1First === "x" ? "o" : "x";
        this.showPlayer(this.p1First);

    }

    showPlayer(turn) {
        if (turn === "o") {
            this.add.text(60, 70, "Jogador 1", { font: "25px 'Titan One'", fill: "blue" });
            this.add.text(400, 70, "O", { font: "25px 'Titan One'", fill: "blue" });
        } else if (turn === "x") {
            this.add.text(60, 70, "Jogador 2", { font: "25px 'Titan One'", fill: "red" });
            // this.add.text(60, 70, "Computador", { font: "25px 'Titan One'", fill: "red" });
            this.add.text(400, 70, "X", { font: "25px 'Titan One'", fill: "red" });
        }
    }

    makeAPlay(x, y, turn) {
        this.ttt_turn = this.add.sprite(x, y, turn);
        this.ttt_turn.play(`${turn}_clicked`);
    }


}