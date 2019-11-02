const Util = require('./utils');
const MovingObject = require('./moving_object');

function Bullet({pos, vel, game, heading}) {
    MovingObject.call(this, {
        pos: pos,
        vel: vel,
        radius: Bullet.RADIUS,
        color: Bullet.COLOR,
        game: game,
        wrappable: false
    })
    this.heading = heading;
}

Util.inherits(Bullet,MovingObject);

Bullet.prototype.draw = function(ctx) {
    let startDeg = 360 - this.heading;

    const img = new Image();
    img.src = 'assets/laserGreen04.png';
    
    const radian = (startDeg * Math.PI / 180) + (180 * Math.PI / 180);
    const width = this.radius * 2;
    const height = this.radius * 15;

    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(radian);
    ctx.drawImage(img, 0 - width / 2, 0 - height / 2, width, height);
    ctx.rotate(-radian);
    ctx.translate(-this.pos[0], -this.pos[1]);
};

Bullet.RADIUS = 2;
Bullet.COLOR = '#67ff38';

module.exports = Bullet;