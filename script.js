let debug_console = document.getElementById("debug_console");
let board = document.getElementById("board");

for (let c of board.children) {
  c.addEventListener("click", on_cell_click);
}

function on_cell_click(e) {
  log_debug("clicked: " + e.target);
  e.target.className = "";
  e.target.classList.add("o");
}

function log_debug(message) {
  debug_console.textContent += message + "\n";
}
