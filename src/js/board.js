export class Board {
  constructor(eBoard, cells, lblP1, lblP2, lblInfo) {
    this.eBoard = eBoard;
    this.cells = cells;
    this.lblP1 = lblP1;
    this.lblP2 = lblP2;
    this.lblInfo = lblInfo;
  }

  renderCells(board) {
    this.cells.forEach((cell, i) => {
      cell.textContent = board[i];
      cell.setAttribute("data", board[i]);
      cell.classList.remove("x", "o");
      if (board[i] !== "") cell.classList.add(board[i]);
    });
  }

  renderBoard(curPlayer) {
    this.eBoard.classList.remove("x", "o");
    this.eBoard.classList.add(curPlayer.mark);
  }

  renderInfo(p1, p2, winner, curPlayer, isOver) {
    let info = "";
    if(winner) info = winner.name + " Won!";
    else {
      if(isOver) info = "Draw!";
      else info = curPlayer.name + "'s turn"
    }

    this.lblP1.textContent = `${p1.name}: ${p1.mark}`;
    this.lblP2.textContent = `${p2.name}: ${p2.mark}`;
    this.lblInfo.textContent = info;
  }

  resetBoard() {
    this.eBoard.classList.remove("x", "o");
    this.cells.forEach(cell => {
      cell.textContent = "";
      cell.classList.remove("x", "o");
    });
  }
}

export function renderControls(isStarted, isOver, btnEditPlayers, btnStart, btnRestart) {
  if(isStarted && !isOver) {
    btnEditPlayers.removeAttribute("disabled");
    btnStart.setAttribute("disabled", "");
    btnRestart.removeAttribute("disabled");
  } else if(!isStarted) {
    btnEditPlayers.setAttribute("disabled", "");
    btnStart.removeAttribute("disabled");
    btnRestart.setAttribute("disabled", "");
  } else if (isOver) {
    btnEditPlayers.removeAttribute("disabled");
    btnStart.setAttribute("disabled", "");
    btnRestart.removeAttribute("disabled");
  }
}
