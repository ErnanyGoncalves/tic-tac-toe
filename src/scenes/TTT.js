import GamePiece from "../classes/gameObject_classes/GamePiece";
import GameText from "../classes/gameObject_classes/GameText";
import Board from "../classes/Board";

export default class TTT extends Phaser.Scene {

    constructor() {
        super("tictactoe");
    }

    init(data) {
        this.gameMode = data.mode;
    }

    create() {

        // Inicialização tabuleiro, status de vencedor e numero de jogadas
        this.board = new Board();
    
        this.winner = null;

        // Qual jogador vai começar
        this.p1First = Math.floor(Math.random() * 10 + 1) > 5 ? "o" : "x";
        this.pInfoStatus = this.p1First === "o" ? true : false;


        // Style para mostrar a vez do jogador
        const styleO = { font: "25px 'Titan One'", fill: "blue" };
        const styleX = { font: "25px 'Titan One'", fill: "red" };

        // Criação das informações dos textos referentes as peças e jogadores
        this.pieceO = new GameText(this, 400, 70, "O", styleO, this.pInfoStatus);
        this.pieceX = new GameText(this, 400, 70, "X", styleX, !this.pInfoStatus);

        if (this.gameMode === "pvp") {
            this.p1 = new GameText(this, 60, 70, "Jogador 1", styleO, this.pInfoStatus);
            this.p2 = new GameText(this, 60, 70, "Jogador 2", styleX, !this.pInfoStatus);
        } else {
            this.pHuman = new GameText(this, 60, 70, "Voce", styleO, this.pInfoStatus);
            this.pPC = new GameText(this, 60, 70, "Computador", styleX, !this.pInfoStatus);
        }      


        //Animações
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

        // Verifica a região que foi clicada para então colocar uma peça no tabuleiro
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
                    this.makeAPlay(100, 250,0, this.p1First);
                }

            } else if (y >= 350 && y < 550) {
                if (!this.board[3]) {
                    this.makeAPlay(100, 450, 3, this.p1First);
                }

            } else if (y >= 550 && y <= 750) {
                if (!this.board[6]) {
                    this.makeAPlay(100, 650, 6, this.p1First);
                }
            }
        } else if (x >= 200 && x < 400) {
            if (y >= 150 && y < 350) {
                if (!this.board[1]) {
                    this.makeAPlay(300, 250, 1, this.p1First);
                }

            } else if (y >= 350 && y < 550) {
                if (!this.board[4]) {
                    this.makeAPlay(300, 450, 4, this.p1First);
                }

            } else if (y >= 550 && y <= 750) {
                if (!this.board[7]) {
                    this.makeAPlay(300, 650, 7, this.p1First);
                }
            }
        } else if (x >= 400 && x <= 600) {
            if (y >= 150 && y < 350) {
                if (!this.board[2]) {
                    this.makeAPlay(500, 250, 2, this.p1First);
                }

            } else if (y >= 350 && y < 550) {
                if (!this.board[5]) {
                    this.makeAPlay(500, 450, 5, this.p1First);
                }

            } else if (y >= 550 && y <= 750) {
                if (!this.board[8]) {
                    this.makeAPlay(500, 650, 8, this.p1First);
                }
            }
        }
    }

    showPlayerInfo() {
        this.pieceO.toggleStatus();
        this.pieceX.toggleStatus();

        if (this.gameMode === "pvp") {
            this.p1.toggleStatus();
            this.p2.toggleStatus();
        } else {
            this.pHuman.toggleStatus();
            this.pieceO.toggleStatus();
        }
    }

    makeAPlay(x, y,pos, turn) {

        //Classe do Sprite de Peça
        const piece = new GamePiece(this, x, y, turn);

        // Atualiza tabuleiro
        this.board.board[pos] = turn;

        this.clickSound.play();

        // Atualiza informação da vez do jogador
        this.showPlayerInfo();

        // Troca a vez do jogador
        this.p1First = this.p1First === "x" ? "o" : "x";

        // this.countPlays++;
        this.board.countPlays++;

        // Checa possivel vencedor
        this.winner = this.board.checkEndgame(this.board.board);
        if (this.winner) {
            this.scene.start("endgame", { winner: this.winner, mode: this.gameMode });
        }
    }



}