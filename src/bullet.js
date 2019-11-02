const Util = require('./utils');
const MovingObject = require('./moving_object');

function Bullet({pos, vel, game}) {
    MovingObject.call(this, {
        pos: pos,
        vel: vel,
        radius: Bullet.RADIUS,
        color: Bullet.COLOR,
        game: game,
        wrappable: false
    })
}

Util.inherits(Bullet, MovingObject);

Bullet.RADIUS = 2;
Bullet.COLOR = '#67ff38';

module.exports = Bullet;