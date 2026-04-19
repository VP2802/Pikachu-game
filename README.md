# One Piece: Bounty Match

A browser-based **One Piece themed Pikachu matching game** built with **HTML, CSS, and JavaScript**.

## Live Demo

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-0ea5e9?style=for-the-badge&logo=github)](https://vp2802.github.io/One-Piece-Bounty-Match/)

## About the Project

**One Piece: Bounty Match** is a browser game inspired by the classic Pikachu tile-matching gameplay, redesigned with a **One Piece pirate theme** and a more polished visual experience.

Players must match identical character tiles by connecting them with a valid path of at most 2 turns. The game features multiple difficulty modes, combo scoring, board shifting mechanics, a stylized **Wanted Poster timer**, and a persistent local leaderboard.

This version also includes **2 play styles**:

- **Single Run**: play 1 stage and finish immediately
- **Continuous**: keep clearing stage after stage, accumulate total score, and press **End** anytime to summarize the run

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
- **Sound effects** for major game actions
- **Leaderboard** saved with `localStorage`
- **Leaderboard shows score, time, mode, and stages cleared**
- **Responsive layout** for smaller screens

---

## Play Types

### Single Run
- Play exactly **1 stage**
- After winning or losing, the result is shown immediately
- Best for quick matches

### Continuous
- Keep playing multiple stages in a row
- Score is accumulated across the run
- The top bar displays:
  - **Run** = total accumulated score
  - **Stage** = current stage score
- Press **End** anytime to stop and save the result
- Leaderboard records how many stages were cleared in that run

---

## Game Modes

| Mode | Time | Hints | Board Size | Special Rules |
|------|------|-------|------------|---------------|
| Easy | 15 minutes | 3 | 9 x 10 | 5 reshuffles |
| Hard | 12 minutes | 0 | 10 x 15 | 3 reshuffles |
| Insane | 10 minutes | 0 | 12 x 15 | 1 reshuffle + fixed random shift for the whole game |
| Impossible | 8 minutes | 0 | 15 x 16 | no reshuffle + random shift after every match |

---

## Scoring

- Base score for each successful match
- Combo bonus for consecutive matches
- Extra **time bonus** when clearing a stage
- Extra **mode bonus** for harder modes
- In **Continuous**, the final run score is the total accumulated score across all cleared stages plus the current stage score if ended mid-run
- Leaderboard ranking priority:
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
5. A match is valid only if the 2 tiles can be connected by a path with at most **2 turns**
6. Clear the board before time runs out
7. Try to get the highest score and clear as many stages as possible

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