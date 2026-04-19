# One Piece: Bounty Match

A browser-based **One Piece themed Pikachu matching game** built with **HTML, CSS, and JavaScript**.

## Live Demo

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-0ea5e9?style=for-the-badge&logo=github)](https://vp2802.github.io/One-Piece-Bounty-Match/)

## About the Project

**One Piece: Bounty Match** is a browser game inspired by the classic Pikachu tile-matching gameplay, redesigned with a **One Piece pirate theme** and a more polished visual style.

Players match identical character tiles by connecting them with a valid path of at most **2 turns**. The game includes multiple difficulty modes, combo-based scoring, board shifting mechanics in higher modes, a stylized **Wanted Poster timer**, and a persistent local leaderboard.

The project also supports **2 play styles**:

- **Single Run**: play one stage and finish immediately
- **Continuous**: keep playing stage after stage, accumulate total run score, and press **End** anytime to summarize the run

---

## Features

- **4 difficulty modes**: Easy, Hard, Insane, Impossible
- **2 play types**: Single Run and Continuous
- **One Piece themed UI**
- **Unique board background for each mode**
- **Wanted Poster countdown timer**
- **Combo scoring system**
- **Hint system** for Easy mode
- **Manual reshuffle** for supported modes
- **Board shifting mechanics** in higher difficulties
- **Pause / Resume / Restart / Home / End** controls
- **Sound toggle** with state preserved across stages
- **Leaderboard** saved with `localStorage`
- **Leaderboard tracks score, time, mode, and cleared stages**
- **Responsive layout** for smaller screens

---

## Play Types

### Single Run
- Play exactly **1 stage**
- Win or lose, the result is shown immediately
- Best for quick score runs

### Continuous
- Keep playing multiple stages in a row
- **Run score** is accumulated across cleared stages
- The top bar displays:
  - **Score** = current accumulated run score
  - **Stage** = current stage number
- Press **End** anytime to stop and save the run
- Leaderboard records how many stages were cleared in that run

---

## Game Modes

| Mode | Time | Hints | Board Size | Special Rules |
|------|------|-------|------------|---------------|
| Easy | 15 minutes | 3 | 9 x 10 | 5 reshuffles |
| Hard | 12 minutes | 0 | 10 x 15 | 3 reshuffles |
| Insane | 10 minutes | 0 | 12 x 15 | 1 reshuffle + fixed random shift for the whole game |
| Impossible | 8 minutes | 0 | 15 x 16 | No reshuffle + random shift after every match |

---

## Scoring

### Match Score
Each successful match gives:
- **Base score**: 100 points
- **Combo bonus** depending on difficulty and combo streak

### Combo Bonus by Mode
- **Easy**: +10 per combo level
- **Hard**: +15 per combo level
- **Insane**: +25 per combo level
- **Impossible**: +35 per combo level

### Time Bonus Multiplier
Remaining time is converted into bonus points when clearing a stage:
- **Easy**: x8
- **Hard**: x12
- **Insane**: x16
- **Impossible**: x20

### Mode Bonus
- **Easy**: 0
- **Hard**: 500
- **Insane**: 1200
- **Impossible**: 2500

### Leaderboard Ranking Priority
1. Higher **score**
2. More **stages cleared**
3. Faster **completion time**

---

## Controls

- **Sound**: turn sound on/off
- **Hints**: reveal a valid move in Easy mode
- **Reshuffle**: shuffle remaining tiles in supported modes
- **Pause**: pause or resume the game
- **Restart**: restart the current run
- **End**: finish the current continuous run and show the summary
- **Home**: return to the start screen

---

## How to Play

1. Open the game in your browser
2. Choose a **Play Type**
3. Choose a **Mode**
4. Click 2 identical tiles to match them
5. A match is valid only if the tiles can be connected by a path with at most **2 turns**
6. Clear the board before time runs out
7. Try to earn the highest score and clear as many stages as possible

---

## Tech Stack

- **HTML5**
- **CSS3**
- **Vanilla JavaScript**
- **LocalStorage** for leaderboard persistence
- **GitHub Pages** for deployment

---

## Project Structure

```bash
One-Piece-Bounty-Match/
├── index.html
├── style.css
├── script.js
├── README.md
├── image/
└── sound/

---

## Notes

- Easy mode is designed to be more beginner-friendly, with hints first and reshuffle unlocked later
- Insane and Impossible are designed to increase pressure through shifting board mechanics
- Continuous mode rewards consistency across multiple cleared stages
- Leaderboard data is stored locally in the browser using `localStorage`

---

## Future Improvements

- Custom in-game toast notifications instead of browser `alert()`
- Player name input for leaderboard entries
- Additional animation and sound polish
- More board themes / character sets
