function MovingObject({ pos, vel, radius, color, game, wrappable }) {
    this.pos = pos;
    this.vel = vel;
    this.radius = radius;
    this.color = color;
    this.game = game;
    this.isWrappable = wrappable;
}


MovingObject.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
        this.pos[0],
        this.pos[1],
        this.radius,
        0,
        2 * Math.PI,
        false
    );

    ctx.fill();
};

MovingObject.prototype.move = function(timeDelta) {
    timeDelta = timeDelta || 1;

    this.pos[0] += (this.vel[0] * timeDelta / 20);
    this.pos[1] += (this.vel[1] * timeDelta / 20);

    if (this.game.isOutOfBounds(this.pos)) {
        if (this.isWrappable) {
            this.pos = this.game.wrap(this.pos, this.radius);
        } else {
            this.game.remove(this);
        }
    }
}

MovingObject.prototype.collideWith = function(otherObject) {
    
}


module.exports = MovingObject;