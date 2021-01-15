console.log('webpack is working!');
const GameView = require('./game_view');

document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('canvas').getContext("2d")

    const gameview = new GameView(ctx);

    const startButton = document.createElement('div');

    startButton.innerHTML = 'START';
    startButton.classList.add('game-button');

    document.getElementById('main').appendChild(startButton);
    // gameview.start()
})