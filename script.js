let debug_console = document.getElementById("debug_console");
let board = document.getElementById("board");
let reset = document.getElementById("newGame");

let current_player = "";
let current_player_HTML = document.getElementById("current_player");
let end_game = false;

const winning_combos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

initialize_game();
start_game();

function initialize_game() {
  for (let c of board.children) {
    c.addEventListener("click", on_cell_click);
  }
  reset.addEventListener("click", start_game);
}

function start_game() {
  clear_board();
  reset_winner();
  let i = Math.floor(Math.random() * 2);
  if (i === 0) {
    set_current_player("o");
  } else {
    set_current_player("x");
  }

  end_game = false;
}

function clear_board() {
  for (let c of board.children) {
    c.className = "";
  }
}

function set_current_player(player) {
  if ((player !== "x") & (player !== "o")) {
    log_debug("Invalid player: " + player);
    throw new Error("Invalid player: " + player);
  }

  current_player = player;
  current_player_HTML.children[0].className = "";
  current_player_HTML.children[0].classList.add(player);
}

function toggle_current_player() {
  if (current_player === "x") {
    set_current_player("o");
    return current_player;
  } else {
    set_current_player("x");
    return current_player;
  }
}

function on_cell_click(e) {
  if (end_game) {
    return;
  }

  if (e.target.className !== "") {
    return;
  }

  e.target.className = "";
  e.target.classList.add(current_player);

  if (check_for_win()) {
    end_game = true;
    announce_result("Winner");
    return;
  }

  if (check_for_draw()) {
    end_game = true;
    announce_result("Draw");
    return;
  }

  toggle_current_player();
}

function check_for_win() {
  let marked_cells = [];
  for (let i = 0; i < board.children.length; i++) {
    log_debug("i: " + i + " = " + board.children[i].className);
    if (board.children[i].className === current_player) {
      marked_cells.push(i);
    }
  }

  log_debug("Marked cells: " + marked_cells);

  if (marked_cells.length < 3) {
    return false;
  }

  for (let combo of winning_combos) {
    if (
      marked_cells.includes(combo[0]) &&
      marked_cells.includes(combo[1]) &&
      marked_cells.includes(combo[2])
    ) {
      return true;
    }
  }

  return false;
}

function check_for_draw() {
  for (let c of board.children) {
    if (c.className == "") {
      return false;
    }
  }
  return true;
}

function announce_result(result) {
  let title = document.getElementById("result_title");
  title.className = "";
  title.innerText = result;
  if (result == "Winner") {
    document.getElementById("current_player").className = "blink_me";
  }
}

function reset_winner() {
  document.getElementById("result_title").className = "hidden";
  document.getElementById("current_player").className = "";
}

function log_debug(message) {
  debug_console.textContent += message + "\n";
}
