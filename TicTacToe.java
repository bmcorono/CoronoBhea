import java.util.Scanner;

public class TicTacToe {

    public static void main(String[] args) {
        Board board = new Board(); 
        int numberOfSquaresPlayed = 0;
        char whoseTurnItIs = 'X';
        String gameEndingMessage = "Hard battle fought to a draw!";

        Scanner scanner = new Scanner(System.in);
        while (numberOfSquaresPlayed < 9) {
            board.printBoard();

            System.out.printf("Choose a square, player %s: ", whoseTurnItIs);

            while (!scanner.hasNextInt()) {
                System.out.println("Invalid input. Please enter a number between 1 and 9.");
                scanner.next();
            }

            int input = scanner.nextInt();  

            if (input < 1 || input > 9) {
                System.out.println("Please choose a square between 1 and 9.");
                continue;
            }

            if (!board.makeMove(input, whoseTurnItIs)) {
                System.out.println("Square already taken. Try again.");
                continue;
            }

            if (board.checkWin(whoseTurnItIs)) {
                gameEndingMessage = "Congratulations, player " + whoseTurnItIs + ", you won!";
                break;
            }

            numberOfSquaresPlayed++;

            whoseTurnItIs = (whoseTurnItIs == 'X') ? 'O' : 'X';
        }

        board.printBoard();
        System.out.println(gameEndingMessage);
    }
}

class Board {
    private char[] board;

    public Board() {
        board = new char[] {'1', '2', '3', '4', '5', '6', '7', '8', '9'};
    }

    public void printBoard() {
        System.out.println(board[0] + " | " + board[1] + " | " + board[2]);
        System.out.println("-+-+-");
        System.out.println(board[3] + " | " + board[4] + " | " + board[5]);
        System.out.println("-+-+-");
        System.out.println(board[6] + " | " + board[7] + " | " + board[8]);
    }

    public boolean makeMove(int position, char player) {
        if (board[position - 1] != 'X' && board[position - 1] != 'O') {
            board[position - 1] = player;
            return true;
        }
        return false;
    }

    public boolean checkWin(char player) {
        return (board[0] == player && board[1] == player && board[2] == player) ||
               (board[3] == player && board[4] == player && board[5] == player) ||
               (board[6] == player && board[7] == player && board[8] == player) ||
               (board[0] == player && board[3] == player && board[6] == player) ||
               (board[1] == player && board[4] == player && board[7] == player) ||
               (board[2] == player && board[5] == player && board[8] == player) ||
               (board[0] == player && board[4] == player && board[8] == player) ||
               (board[2] == player && board[4] == player && board[6] == player);
    }
}