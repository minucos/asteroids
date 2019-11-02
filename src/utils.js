const Util = {
    inherits: function inherits(child, parent) {
        function Proxy() {};
        Proxy.prototype = parent.prototype;
        child.prototype = new Proxy();
        child.prototype.constructor = child;
    },
    randomVec(length) {
        const deg = 2 * Math.PI * Math.random();
        return Util.scale([Math.sin(deg), Math.cos(deg)], length);
    },
    getVec(length,angle) {
        const deg = 2 * Math.PI * (1 / 360 * angle);
        return Util.scale([Math.sin(deg), Math.cos(deg)], length);
    },
    // Scale the length of a vector by the given amount.
    scale(vec, m) {
        return [vec[0] * m, vec[1] * m];
    },
    debounce(func,wait) {
        setTimeout(func,wait)
    }
}

module.exports = Util;