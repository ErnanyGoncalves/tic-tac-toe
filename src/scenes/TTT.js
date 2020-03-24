import GamePiece from "../classes/gameObject/GamePiece";
import GameText from "../classes/gameObject/GameText";
import Board from "../classes/Board";
import PlayerHuman from "../classes/PlayerHuman";
import PlayerComputer from "../classes/PlayerComputer";


export default class TTT extends Phaser.Scene {

    constructor() {
        super("tictactoe");
    }


    init(data) {
        this.gameMode = data.mode;
        this.aiLevel = data.dificulty;
    }

    create() {

        // Inicialização tabuleiro, status de vencedor e numero de jogadas
        this.board = new Board();
        this.winner = null;

        this.playerO = this.gameMode === "pvp" ? new PlayerHuman("Jogador 1", "o") : new PlayerHuman("Voce", "o");
        this.playerX = this.gameMode === "pvp" ? new PlayerHuman("Jogador 2", "x") : new PlayerComputer("Computador", "x");

        // Qual jogador vai começar
        this.playerFirst = Math.floor(Math.random() * 10 + 1) > 5 ? this.playerO : this.playerX;
        this.playerInfoStatus = this.playerFirst.piece === "o" ? true : false;

        // Style para mostrar a vez do jogador
        const styleO = { font: "25px 'Titan One'", fill: "blue" };
        const styleX = { font: "25px 'Titan One'", fill: "red" };

        // Criação das informações dos textos referentes as peças e jogadores
        this.pieceO = new GameText(this, 400, 70, "O", styleO, this.playerInfoStatus);
        this.pieceX = new GameText(this, 400, 70, "X", styleX, !this.playerInfoStatus);

        if (this.gameMode === "pvp") {
            this.p1 = new GameText(this, 60, 70, "Jogador 1", styleO, this.playerInfoStatus);
            this.p2 = new GameText(this, 60, 70, "Jogador 2", styleX, !this.playerInfoStatus);
        } else {
            this.p1 = new GameText(this, 60, 70, "Voce", styleO, this.playerInfoStatus);
            if (this.aiLevel === "easy") {
                this.p2 = new GameText(this, 60, 70, "Computador (Facil)", styleX, !this.playerInfoStatus);
            } else if (this.aiLevel === "normal") {
                this.p2 = new GameText(this, 60, 70, "Computador (Normal)", styleX, !this.playerInfoStatus);
            } else {
                this.p2 = new GameText(this, 60, 70, "Computador (Dificil)", styleX, !this.playerInfoStatus);
            }
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

        this.input.on('pointerdown', ({ x, y }) => {
            if (this.playerFirst.piece === "o" || this.gameMode === "pvp") {
                const space = this.playerO.checkRegion(this.board.board, x, y);
                if (space !== "taken") {
                    this.makeAPlay(space);
                    if ((this.winner !== "o" && this.winner !== "x" && this.winner !== "draw") && this.gameMode === "pvpc" && this.playerFirst.piece === "x") {
                        this.aiPlays();
                    }
                }
            }
        });

        if (this.gameMode === "pvpc" && this.playerFirst.piece === "x") {
            console.log("HeLLOW");
            this.aiPlays();
        }

        this.add.image(0, 0, 'board').setOrigin(0, -0.25);
    }


    aiPlays() {
        console.log(this.board.countPlays ,this.winner,this.aiLevel);
        setTimeout(() => {
            if (this.board.countPlays < 9 && (this.winner !== "o" && this.winner !== "x" && this.winner !== "draw")) {
                if (this.aiLevel === "easy") {
                    const randomPos = this.playerX.randomPosition(this.board.board);
                    this.makeAPlay(randomPos);
                } else if (this.aiLevel === "hard") {
                    const bestPos = this.playerX.minimax(this.board.board, "x").index;
                    this.makeAPlay(bestPos);
                } else {
                    const easyProbability = 0.6;
                    const pos = Math.random() < easyProbability ? this.playerX.randomPosition(this.board.board) : this.playerX.minimax(this.board.board, "x").index;
                    this.makeAPlay(pos);
                }
            }
        }, 500);
    }

    _getNextPlayer() {
        return this.playerFirst === this.playerX ? this.playerO : this.playerX;
    }


    showPlayerInfo() {
        this.pieceO.toggleStatus();
        this.pieceX.toggleStatus();

        this.p1.toggleStatus();
        this.p2.toggleStatus();
    }

    makeAPlay(pos) {

        const boardPosCoordinates = [
            [100, 250], [300, 250], [500, 250],
            [100, 450], [300, 450], [500, 450],
            [100, 650], [300, 650], [500, 650]
        ];

        //Classe do Sprite de Peça
        const piece = new GamePiece(this, boardPosCoordinates[pos][0], boardPosCoordinates[pos][1], this.playerFirst.piece);

        // Atualiza tabuleiro
        this.board.board[pos] = this.playerFirst.piece;

        this.clickSound.play();

        // Atualiza informação da vez do jogador
        this.showPlayerInfo();

        // Troca a vez do jogador
        // this.playerFirst = this._getNextPlayer();
        this.playerFirst = this.playerFirst === this.playerX ? this.playerO : this.playerX;

        this.board.countPlays++;

        // Checa possivel vencedor
        this.winner = this.board.checkEndgame(this.board.board);
        if (this.winner) {
            this.scene.start("endgame", { winner: this.winner, mode: this.gameMode });
        }
    }
}