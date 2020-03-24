import Player from "./Player";
export default class PlayerComputer extends Player {
    constructor(name, piece) {
        super(name, piece);
        this.fc = 0;
    }

    randomPosition(board) {
        let randomPos = Math.floor(Math.random() * 9);
        while (1) {
            if (Number.isInteger(board[randomPos])) {
                return randomPos;
            } else {
                randomPos = Math.floor(Math.random() * 9);
            }
        }
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
            move.index = board[availableSpots[i]];

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
        return board.filter(value => value !== "o" && value !== "x");
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