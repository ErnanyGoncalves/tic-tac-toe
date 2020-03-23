import GamePiece from "../classes/gameObject/GamePiece";
import GameText from "../classes/gameObject/GameText";
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

        // Function calls - minimax
        this.fc = 0;


        if (this.p1First === "o" || (this.p1First === "x" && this.gameMode === "pvp")) {
            // Verifica a região que foi clicada para então colocar uma peça no tabuleiro
            this.input.on('pointerdown', ({ x, y }) => {
                this.checkRegion(x, y);
            });
        } else if (this.p1First === "x" && this.gameMode === "pvpc") {
            setTimeout(() => {
                this.bestSpot = this.minimax(this.board.board, "x");
                this.makeAPlay(this.bestSpot.index);
                // console.log("index: " + this.bestSpot.index);
                // console.log("function calls: " + this.fc);
            }, 500);
        }


        this.add.image(0, 0, 'board').setOrigin(0, -0.25);
    }



    minimax(board, player) {
        this.fc++;

        let availableSpots = this.openSpaces(board);

        // checks for the terminal states such as win, lose, and tie and returning a value accordingly
        if (this.winning(board, "o")) {
            return { score: -10 };
        }
        else if (this.winning(board, "x")) {
            return { score: 10 };
        }
        else if (availableSpots.length === 0) {
            return { score: 0 };
        }

        let moves = [];

        for (let i = 0; i < availableSpots.length; i++) {
            //create an object for each and store the index of that spot that was stored as a number in the object's index key
            let move = {};
            move.index = availableSpots[i];

            // set the empty spot to the current player
            board[availableSpots[i]] = player;

            //if collect the score resulted from calling minimax on the opponent of the current player
            if (player === "x") {
                let result = this.minimax(board, "o");
                move.score = result.score;
            }
            else {
                let result = this.minimax(board, "x");
                move.score = result.score;
            }

            //reset the spot to empty
            board[availableSpots[i]] = move.index;

            // push the object to the array
            moves.push(move);

        }

        // if it is the computer's turn loop over the moves and choose the move with the highest score
        let bestMove;
        if (player === "x") {
            let bestScore = -10000;
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score > bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        } else {
            // else loop over the moves and choose the move with the lowest score
            let bestScore = 10000;
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score < bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }

        // return the chosen move (object) from the array to the higher depth
        return moves[bestMove];

    }

    openSpaces(board) {
        return board.map((value, index) => (value === "o" || value === "x") ? value : index).filter(value => value !== "o" && value !== "x");
    }


    checkRegion(x, y) {
        /*
            x >= 0 x < 200; y >= 150 y < 350      x >= 200 x < 400; y >= 150 y < 350      x >= 400 x <= 600; y >= 150 y < 350
    
            x >= 0 x < 200; y >= 350 y < 550     x >= 200 x < 400; y >= 350 y < 550       x >= 400 x <= 600; y >= 350 y < 550
    
            x >= 0 x < 200; y >= 550 y <= 750      x >= 200 x < 400; y >= 550 y <= 750    x >= 400 x <= 600 0; y >= 550 y <= 750
        */

        if (x >= 0 && x < 200) {
            if (y >= 150 && y < 350) {
                if (!this.board.board[0])
                    this.makeAPlay(0);

            } else if (y >= 350 && y < 550) {
                if (!this.board.board[3])
                    this.makeAPlay(3);

            } else if (y >= 550 && y <= 750) {
                if (!this.board.board[6])
                    this.makeAPlay(6);

            }
        } else if (x >= 200 && x < 400) {
            if (y >= 150 && y < 350) {
                if (!this.board.board[1])
                    this.makeAPlay(1);

            } else if (y >= 350 && y < 550) {
                if (!this.board.board[4])
                    this.makeAPlay(4);

            } else if (y >= 550 && y <= 750) {
                if (!this.board.board[7])
                    this.makeAPlay(7);

            }
        } else if (x >= 400 && x <= 600) {
            if (y >= 150 && y < 350) {
                if (!this.board.board[2])
                    this.makeAPlay(2);

            } else if (y >= 350 && y < 550) {
                if (!this.board.board[5])
                    this.makeAPlay(5);

            } else if (y >= 550 && y <= 750)
                if (!this.board.board[8])
                    this.makeAPlay(8);

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
            this.pPC.toggleStatus();
        }
    }

    /*
            100, 250        300, 250          500, 250
            100, 450        300, 450          500, 450
            100, 650        300, 650          500, 650
    */


    makeAPlay(pos) {
        const boardPosCoordinates = [
            [100, 250], [300, 250], [500, 250],
            [100, 450], [300, 450], [500, 450],
            [100, 650], [300, 650], [500, 650]
        ];

        //Classe do Sprite de Peça
        const piece = new GamePiece(this, boardPosCoordinates[pos][0], boardPosCoordinates[pos][1], this.p1First);

        // Atualiza tabuleiro
        this.board.board[pos] = this.p1First;

        this.clickSound.play();

        // Atualiza informação da vez do jogador
        this.showPlayerInfo();
        // Troca a vez do jogador
        this.p1First = this.p1First === "x" ? "o" : "x";

        this.board.countPlays++;

        // Checa possivel vencedor
        this.winner = this.board.checkEndgame(this.board.board);
        if (this.winner) {
            this.scene.start("endgame", { winner: this.winner, mode: this.gameMode });
        }
    }

    winning(board, player) {
        if (
            (board[0] == player && board[1] == player && board[2] == player) ||
            (board[3] == player && board[4] == player && board[5] == player) ||
            (board[6] == player && board[7] == player && board[8] == player) ||
            (board[0] == player && board[3] == player && board[6] == player) ||
            (board[1] == player && board[4] == player && board[7] == player) ||
            (board[2] == player && board[5] == player && board[8] == player) ||
            (board[0] == player && board[4] == player && board[8] == player) ||
            (board[2] == player && board[4] == player && board[6] == player)
        ) {
            return true;
        } else {
            return false;
        }
    }

}