import { invoke } from "@tauri-apps/api/tauri";

let game: any;
let button: any;

async function newGame() {
  game = await invoke("new_game");
  render();
}

async function getGameState() {
  game = await invoke("get_game_state");
  render();
}

function render() {
  let cell: any;
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      cell = document.getElementById(`c${row}${col}`);
      if (game.state[row][col] === 0) {
        cell.innerText = "";
        cell.style.backgroundColor = null;
      } else {
        cell.innerText = game.state[row][col];
        switch (game.state[row][col]) {
          case 2:
            cell.style.backgroundColor = "#66ff33";
            break;
          case 4:
            cell.style.backgroundColor = "#33ff99";
            break;
          case 8:
            cell.style.backgroundColor = "#99ff33";
            break;
          case 16:
            cell.style.backgroundColor = "#33ff66";
            break;
          case 32:
            cell.style.backgroundColor = "#33ffcc";
            break;
          case 64:
            cell.style.backgroundColor = "#33ccff";
            break;
          case 128:
            cell.style.backgroundColor = "#ff33cc";
            break;
          case 256:
            cell.style.backgroundColor = "#ff3399";
            break;
          case 512:
            cell.style.backgroundColor = "#ff3333";
            break;
          case 1024:
            cell.style.backgroundColor = "#33ffff";
            break;
          case 2048:
            cell.style.backgroundColor = "#ff6633";
            break;
          case 4096:
            cell.style.backgroundColor = "#ccff33";
            break;
          default:
            cell.style.backgroundColor = null;
        }
      }
    }
  }
  const score: any = document.getElementById("score");
  score.innerText = game.score;
  const button: any = document.querySelector(".message");
  if (game.lock === true) button.innerText = "Game Over";
  else button.innerText = "";
}

async function gameEventListener(gEvent: number) {
  game = await invoke("game_event_listener", { gameEvent: gEvent });
  render();
}

window.addEventListener("DOMContentLoaded", () => {
  getGameState();
  button = document.getElementById("new-game-button");
  button.onclick = () => {
    newGame();
  };
  document.addEventListener("keydown", (event) => {
    if (event.key == "ArrowUp") gameEventListener(1);
    else if (event.key == "ArrowRight") gameEventListener(2);
    else if (event.key == "ArrowDown") gameEventListener(3);
    else if (event.key == "ArrowLeft") gameEventListener(4);
  });
});
