# Tic-Tac-Toe

A classic Tic-Tac-Toe game built with vanilla HTML, CSS, and JavaScript. Play against a computer opponent or challenge a friend in two-player mode.

## Live Demo

[tictactoe-byarden.netlify.app](https://tictactoe-byarden.netlify.app/)

## Features

- **Two Game Modes**
  - **Vs Computer** — play against an AI opponent
  - **Two Players** — play locally against a friend
- **Symbol Selection** — choose to play as X or O when playing against the computer
- **Smart Computer AI** — the computer will:
  1. Take a winning move if one is available
  2. Block the opponent's winning move if it can't win
  3. Otherwise, pick a random available square
- **Score Tracking** — running score for X and O across multiple rounds
- **Turn Indicator** — highlights the active player and displays whose turn it is
- **Win / Draw Detection** — highlights the winning combination or announces a draw
- **Game Controls**
  - **New Game** — resets the board, keeps the score
  - **Reset Score** — resets both the board and the score
  - **Change Settings** — return to the setup screen to change mode/symbol (resets score)

## How to Play

1. Choose a game mode: **Vs Computer** or **Two Players**.
2. If playing against the computer, choose whether you want to play as **X** or **O**.
3. Click **Start** to begin the game.
4. Take turns clicking on empty squares to place your symbol.
5. The first player to align three symbols horizontally, vertically, or diagonally wins the round.
6. Use **New Game** to play another round, or **Reset Score** to start fresh.

## Project Structure

```
├── index.html      # Game markup and structure
├── style.css       # Styling and layout
├── script.js       # Game logic and interactivity
└── README.md
```

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript (no frameworks or libraries)

## Running Locally

No build steps or dependencies required.

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/<your-repo-name>.git
   ```
2. Navigate into the project folder:
   ```bash
   cd <your-repo-name>
   ```
3. Open `index.html` in your browser, or serve it locally with a tool like [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).

## Deployment

This project can be deployed on any static hosting platform, such as:

- [GitHub Pages](https://pages.github.com/)
- [Netlify](https://www.netlify.com/)
- [Vercel](https://vercel.com/)

## Author

**Arden**

- GitHub: [arden-codes](https://github.com/arden-codes)
- Instagram: [arden.codes](https://www.instagram.com/arden.codes)
- LinkedIn: [arden-codes](https://www.linkedin.com/in/arden-codes-367623431/)
- X: [ardencodes](https://x.com/ardencodes)
