console.log('webpack is working!');
const GameView = require('./game_view');

document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('canvas').getContext("2d")

    const gameview = new GameView(ctx);

    gameview.start()
})