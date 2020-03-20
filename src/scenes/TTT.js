
export default class TTT extends Phaser.Scene {

    constructor() {
        super("tictactoe");
    }

    init(data) {
        this.gameMode = data.mode;
    }

    create() {

        this.board = Array(9).fill(null);
        this.winner = null;
        this.countPlays = 0;

        this.p1First = Math.floor(Math.random() * 10 + 1) > 5 ? "o" : "x";

        this.clickSound = this.sound.add("touch");

        this.playerTurn = this.add.bitmapText(50, 40, "bitmap_font", "Vez do:", 40);

        this.showPlayer(this.p1First);

        this.input.on('pointerdown', ({ x, y }) => { //pointer.x, pointer,y
            this.checkRegion(x, y);
        });

        this.add.image(0, 0, 'board').setOrigin(0, -0.25);
    }


    checkRegion(x, y) {

        /*
            x >= 0 x < 200; y >= 150 y < 350      x >= 200 x < 400; y >= 150 y < 350      x >= 400 x <= 600; y >= 150 y < 350
    
            x >= 0 x < 200; y >= 350 y < 550     x >= 200 x < 400; y >= 350 y < 550       x >= 400 x <= 600; y >= 350 y < 550
    
            x >= 0 x < 200; y >= 550 y <= 750      x >= 200 x < 400; y >= 550 y <= 750    x >= 400 x <= 600 0; y >= 550 y <= 750
        */

        if (x >= 0 && x < 200) {
            if (y >= 150 && y < 350) {
                if (!this.board[0]) {
                    this.board[0] = this.p1First;
                    this.makeAPlay(100, 250, this.p1First);
                }

            } else if (y >= 350 && y < 550) {
                if (!this.board[3]) {
                    this.board[3] = this.p1First;
                    this.makeAPlay(100, 450, this.p1First);
                }

            } else if (y >= 550 && y <= 750) {
                if (!this.board[6]) {
                    this.board[6] = this.p1First;
                    this.makeAPlay(100, 650, this.p1First);
                }
            }
        } else if (x >= 200 && x < 400) {
            if (y >= 150 && y < 350) {
                if (!this.board[1]) {
                    this.board[1] = this.p1First;
                    this.makeAPlay(300, 250, this.p1First);
                }

            } else if (y >= 350 && y < 550) {
                if (!this.board[4]) {
                    this.board[4] = this.p1First;
                    this.makeAPlay(300, 450, this.p1First);
                }

            } else if (y >= 550 && y <= 750) {
                if (!this.board[7]) {
                    this.board[7] = this.p1First;
                    this.makeAPlay(300, 650, this.p1First);
                }
            }
        } else if (x >= 400 && x <= 600) {
            if (y >= 150 && y < 350) {
                if (!this.board[2]) {
                    this.board[2] = this.p1First;
                    this.makeAPlay(500, 250, this.p1First);
                }

            } else if (y >= 350 && y < 550) {
                if (!this.board[5]) {
                    this.board[5] = this.p1First;
                    this.makeAPlay(500, 450, this.p1First);
                }

            } else if (y >= 550 && y <= 750) {
                if (!this.board[8]) {
                    this.board[8] = this.p1First;
                    this.makeAPlay(500, 650, this.p1First);
                }
            }
        }
    }

    showPlayer(turn) {
        if (this.gameMode === "pvp") {
            if (turn === "o") {                
                this.add.text(60, 70, "Jogador 1", { font: "25px 'Titan One'", fill: "blue" });
                this.add.text(400, 70, "O", { font: "25px 'Titan One'", fill: "blue" });
            } else if (turn === "x") {
                this.add.text(60, 70, "Jogador 2", { font: "25px 'Titan One'", fill: "red" });
                this.add.text(400, 70, "X", { font: "25px 'Titan One'", fill: "red" });
            }
        }else{
            if (turn === "o") {
                this.add.text(60, 70, "Voce", { font: "25px 'Titan One'", fill: "blue" });
                this.add.text(400, 70, "O", { font: "25px 'Titan One'", fill: "blue" });
            } else if (turn === "x") {
                this.add.text(60, 70, "Computador", { font: "25px 'Titan One'", fill: "red" });
                this.add.text(400, 70, "X", { font: "25px 'Titan One'", fill: "red" });
            }
        }
    }

    makeAPlay(x, y, turn) {
        this.ttt_turn = this.add.sprite(x, y, turn);

        this.clickSound.play();

        this.ttt_turn.play(`${turn}_clicked`);

        this.p1First = this.p1First === "x" ? "o" : "x";
        this.showPlayer(this.p1First);

        this.countPlays++;

        this.winner = this.checkEndgame(this.board);
        if (this.winner) {
            this.scene.start("endgame", { winner: this.winner, mode: this.gameMode });
        }
    }

    checkEndgame(board) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }

        if (this.countPlays === 9) return "draw";
    }

}