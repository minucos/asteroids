console.log('webpack is working!');
const GameView = require('./game_view');

document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('canvas').getContext("2d")

    const gameview = new GameView(ctx, true);

    const startButton = document.createElement('div');

    startButton.innerHTML = 'START';
    startButton.setAttribute('id','game-button');

    function startGame(e) {
        e.target.classList.add('hide-button');
        const newGame = new GameView(ctx);
        newGame.start();
    };

    startButton.addEventListener('click', startGame)

    document.getElementById('main').appendChild(startButton);

    gameview.start();

    function muteSound(e) {
        const sounds = document.getElementsByTagName('audio');

        for (let i = 0; i < sounds.length; i++) {
            let sound = sounds[i];

            if (sound.muted) {
                e.target.style.color = 'white';
                sound.muted = false;
            } else {
                e.target.style.color = 'red';
                sound.muted = true;
            }
        };
    }

    document.getElementById('mute-button').addEventListener('click',muteSound);

})