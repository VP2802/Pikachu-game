# One Piece: Bounty Match

A browser-based **One Piece themed Pikachu matching game** built with **HTML, CSS, and JavaScript**.

## Live Demo

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-0ea5e9?style=for-the-badge&logo=github)](https://vp2802.github.io/One-Piece-Bounty-Match/)

## About the Project

This project recreates the classic tile-matching gameplay with a **One Piece** visual theme and a more polished UI/UX. Players match identical character tiles by connecting them with a valid path, earn points, and race against a stylized **Wanted Poster** countdown timer.

The game includes multiple difficulty modes, score progression, combo bonuses, hint and reshuffle mechanics, sound controls, pause/resume, and a local leaderboard.

## Features

- **4 game modes**: Easy, Hard, Insane, Impossible
- **One Piece themed UI** with ocean/pirate-inspired styling
- **Unique background artwork for each game mode**
- **Board reveal effect** where matched tiles gradually uncover the hidden image beneath
- **Animated tile removal transitions** for smoother visual feedback
- **Wanted Poster timer** with animated warning/danger states
- **Combo scoring system** with increasing bonus points
- **Hint system** for Easy mode
- **Manual reshuffle** for selected modes
- **Board shifting mechanics** in higher difficulties
- **Pause / Resume / Restart / Home** controls
- **Sound effects** for match, wrong move, win, time pressure, hint, reshuffle, and restart
- **Leaderboard** saved with `localStorage`
- **Responsive layout** for smaller screens

## Game Modes

| Mode | Time | Hints | Board Size | Special Rules |
|------|------|-------|------------|---------------|
| Easy | 15 minutes | 3 | 9 x 10 | 5 reshuffles |
| Hard | 12 minutes | 0 | 10 x 15 | 3 reshuffles |
| Insane | 10 minutes | 0 | 12 x 15 | 1 reshuffle + fixed random shift for the whole game |
| Impossible | 10 minutes | 0 | 15 x 16 | no reshuffle + random shift after every match |

## Scoring

- Base score for each successful match
- Combo bonus for consecutive correct matches
- Extra **time bonus** when finishing the board
- Extra **mode bonus** for higher difficulty levels
- Leaderboard ranking is based on **score first**, then **completion time**

## Tech Stack

- **HTML5**
- **CSS3**
- **Vanilla JavaScript**
- **LocalStorage** for leaderboard persistence
- **GitHub Pages** for deployment

## Project Structure

```bash
One-Piece-Bounty-Match/
├── index.html
├── style.css
├── script.js
├── README.md
├── image/
└── sound/
```

## How to Run Locally

1. Clone this repository.
2. Open the project folder in **VS Code**.
3. Run the project with **Live Server** or simply open `index.html` in your browser.

## How to Play

1. Choose a game mode from the start screen.
2. Click 2 identical tiles to match them.
3. A match is valid only if the two tiles can be connected by a path with at most 2 turns.
4. Clear the entire board before time runs out.
5. Try to reach the leaderboard with the highest score.

## Controls

- **Sound**: turn sound on/off
- **Hints**: show a valid move when available
- **Reshuffle**: shuffle remaining tiles in supported modes
- **Pause**: pause or resume the game
- **Restart**: start the current mode again
- **Home**: return to the start screen

## Notes

- Leaderboard data is stored in the browser using `localStorage`, so it will remain on the same browser/device unless cleared.
- The game uses image and sound assets stored in the project folders.

## Future Improvements

- Add player name input for leaderboard records
- Add animations and transition polish for tile removal
- Add more themes or character packs
- Add mobile-specific controls and optimization
- Add online leaderboard support
