import GamePiece from "../classes/gameObject_classes/GamePiece";
import GameText from "../classes/gameObject_classes/GameText";

export default class TTT extends Phaser.Scene {

    constructor() {
        super("tictactoe");
    }

    init(data) {
        this.gameMode = data.mode;
    }

    create() {
        // Style para mostrar a vez do jogador
        const styleO = { font: "25px 'Titan One'", fill: "blue" };
        const styleX = { font: "25px 'Titan One'", fill: "red" };

        // Criação das informações dos textos referentes as peças e jogadores
        this.pieceO = new GameText(this, 400, 70, "O", styleO);
        this.pieceX = new GameText(this, 400, 70, "X", styleX);

        this.p1 = new GameText(this, 60, 70, "Jogador 1", styleO);
        this.p2 = new GameText(this, 60, 70, "Jogador 2", styleX);

        this.pHuman = new GameText(this, 60, 70, "Voce", styleO);
        this.pPC = new GameText(this, 60, 70, "Computador", styleX);


        // Qual jogador vai começar
        this.p1First = Math.floor(Math.random() * 10 + 1) > 5 ? "o" : "x";



        this.board = Array(9).fill(null);
        this.winner = null;
        this.countPlays = 0;

        

        this.anims.create({
            key: "o_clicked",
            frames: this.anims.generateFrameNames("o"),
            frameRate: 20,
            repeat: 0
        });

        this.anims.create({
            key: "x_clicked",
            frames: this.anims.generateFrameNames("x"),
            frameRate: 20,
            repeat: 0
        });

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
                this.p1.visible = true;
                this.pieceO.visible = true;
                this.p2.visible = false;
                this.pieceX.visible = false;
                //     this.add.text(60, 70, "Jogador 1", { font: "25px 'Titan One'", fill: "blue" });
                //     this.add.text(400, 70, "O", { font: "25px 'Titan One'", fill: "blue" });
            } else if (turn === "x") {
                this.p1.visible = false;
                this.pieceO.visible = false;
                this.p2.visible = true;
                this.pieceX.visible = true;
                //     this.add.text(60, 70, "Jogador 2", { font: "25px 'Titan One'", fill: "red" });
                //     this.add.text(400, 70, "X", { font: "25px 'Titan One'", fill: "red" });
            }
        } else {
            if (turn === "o") {
                this.pHuman.visible = true;
                this.pieceO.visible = true;
                this.pPC.visible = false;
                this.pieceX.visible = false;
                //     this.add.text(60, 70, "Voce", { font: "25px 'Titan One'", fill: "blue" });
                //     this.add.text(400, 70, "O", { font: "25px 'Titan One'", fill: "blue" });
            } else if (turn === "x") {
                this.pHuman.visible = false;
                this.pieceO.visible = false;
                this.pPC.visible = true;
                this.pieceX.visible = true;
                //     this.add.text(60, 70, "Computador", { font: "25px 'Titan One'", fill: "red" });
                //     this.add.text(400, 70, "X", { font: "25px 'Titan One'", fill: "red" });
            }
        }
    }

    makeAPlay(x, y, turn) {


        //Classe do Sprite de Peça
        const piece = new GamePiece(this, x, y, turn);

        // ------ Adição e execução da animação do sprite ------ (Acredito que não será mais necessário depois)
        // this.ttt_turn = this.add.sprite(x, y, turn);
        // this.ttt_turn.play(`${turn}_clicked`);


        this.clickSound.play();

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