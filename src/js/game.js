export class Game {
  constructor(p1, p2) {
    if (!p1 || !p2) throw new Error("No players provided!");

    this.board = Array(9).fill("");
    this.p1 = p1;
    this.p2 = p2;
    this.curPlayer = p1;
    this.winner = null;
    this.isStarted = true;
    this.isOver = false;
  }

  resetData() {
    this.board.fill("");
    this.curPlayer = this.p1;
    this.winner = null;
    this.isStarted = true;
    this.isOver = false;
  }

  checkGameOver() {
    const wins = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
      [0, 4, 8], [2, 4, 6]             // diagonal
    ];

    for (const [a, b, c] of wins) {
      if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
        this.winner = this.board[a] === this.p1.mark ? this.p1 : this.p2;
      }
    }

    if(this.winner || !this.board.includes("")) {
      this.isStarted = false;
      this.isOver = true;
    }
  }

  play(index) {
    if(!this.isStarted || this.isOver || this.board[index] !== "") return false;
    this.board[index] = this.curPlayer.mark;
    return true;
  }

  switchPlayer() { this.curPlayer = this.curPlayer === this.p1 ? this.p2 : this.p1; }
}
