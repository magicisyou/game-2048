// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod game;

use game::Game;

use std::sync::Mutex;
use tauri::State;

struct GameState {
    game: Mutex<Game>,
}

#[tauri::command]
fn new_game(game_state: State<GameState>) -> Game {
    game_state.game.lock().unwrap().reset();
    *game_state.game.lock().unwrap()
}

#[tauri::command]
fn get_game_state(game_state: State<GameState>) -> Game {
    *game_state.game.lock().unwrap()
}

#[tauri::command]
fn game_event_listener(game_event: u8, game_state: State<GameState>) -> Game {
    game_state.game.lock().unwrap().event(game_event);
    *game_state.game.lock().unwrap()
}

fn main() {
    tauri::Builder::default()
        .manage(GameState {
            game: Mutex::new(Game::new()),
        })
        .invoke_handler(tauri::generate_handler![
            new_game,
            game_event_listener,
            get_game_state
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
