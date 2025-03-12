import { Game } from './game.js';
import { getPlayersData, promptPlayersData, closeDialog } from './players.js';
import { Board, renderControls } from './board.js';

const controller = (function() {
  const btnEditPlayers = document.querySelector("#players-data");
  const btnCancel      = document.querySelector("#cancel");
  const btnStart       = document.querySelector("#start");
  const btnRestart     = document.querySelector("#restart");
  const dialog         = document.querySelector("dialog");
  const form           = document.querySelector("#form-players-data");
  const eBoard         = document.querySelector("#board");
  const cells          = document.querySelectorAll(".cell");
  const lblP1          = document.querySelector("#p1");
  const lblP2          = document.querySelector("#p2");
  const lblInfo        = document.querySelector("#info");

  const board = new Board(eBoard, cells, lblP1, lblP2, lblInfo);
  let game    = null;

  btnEditPlayers.addEventListener("click", editPlayers);
  btnCancel.addEventListener("click", () => closeDialog(dialog));
  btnStart.addEventListener("click", init);
  btnRestart.addEventListener("click", restart);
  eBoard.addEventListener("click", play);

  async function init() {
    promptPlayersData(dialog);
    try {
      const { p1, p2 } = await getPlayers();
      game = new Game(p1, p2);
      render();
    } catch (err) { alert(err); }
  }

  async function setPlayers() {
    try {
      const { p1, p2 } = await getPlayers();
      game.p1 = p1;
      game.p2 = p2;
      render();
    } catch (err) { alert(err); }
  }

  async function editPlayers() {
    if (!game) {
      alert("No active games!");
      return;
    }
    setPlayers();
  }

  async function getPlayers() {
    promptPlayersData(dialog);
    try {
      const { p1, p2 } = await getPlayersData(form, dialog, btnCancel);
      return { p1, p2 };
    } catch (err) { throw err }
  }

  function restart() {
    if (!game) {
      alert("No active games!");
      return;
    }
    game.resetData();
    render();
  }

  function render() {
    board.renderCells(game.board);
    board.renderBoard(game.curPlayer);
    board.renderInfo(game.p1, game.p2, game.winner, game.curPlayer, game.isOver);
    renderControls(game.isStarted, game.isOver, btnEditPlayers, btnStart, btnRestart);
  }

  function play(e) {
    if(!game || !game.isStarted || game.isOver || !e.target.hasAttribute("data")) return;

    const index = Number(e.target.getAttribute("index"));
    if (isNaN(index) || index < 0 || index > 8) return;

    if(game.play(index)) {
      board.renderCells(game.board);
      game.checkGameOver();
      if(!game.isOver) game.switchPlayer();
      render();
    }
  }
})();
