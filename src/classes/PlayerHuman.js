import Player from "./Player";

export default class PlayerHuman extends Player {
    constructor(name, piece) {
        super(name, piece);
    }

    checkRegion(board, x, y) {

        /*
            x >= 0 x < 200; y >= 150 y < 350      x >= 200 x < 400; y >= 150 y < 350      x >= 400 x <= 600; y >= 150 y < 350
    
            x >= 0 x < 200; y >= 350 y < 550     x >= 200 x < 400; y >= 350 y < 550       x >= 400 x <= 600; y >= 350 y < 550
    
            x >= 0 x < 200; y >= 550 y <= 750      x >= 200 x < 400; y >= 550 y <= 750    x >= 400 x <= 600 0; y >= 550 y <= 750
        */

        if (x >= 0 && x < 200) {
            if (y >= 150 && y < 350) {
                if (!board[0]) return 0;
            } else if (y >= 350 && y < 550) {
                if (!board[3]) return 3;
            } else if (y >= 550 && y <= 750) {
                if (!board[6]) return 6;
            }
        } else if (x >= 200 && x < 400) {
            if (y >= 150 && y < 350) {
                if (!board[1]) return 1;
            } else if (y >= 350 && y < 550) {
                if (!board[4]) return 4;
            } else if (y >= 550 && y <= 750) {
                if (!board[7]) return 7;
            }
        } else if (x >= 400 && x <= 600) {
            if (y >= 150 && y < 350) {
                if (!board[2]) return 2;
            } else if (y >= 350 && y < 550) {
                if (!board[5]) return 5;
            } else if (y >= 550 && y <= 750) {
                if (!board[8]) return 8;
            }
        }
        return "taken";
    }

    
}