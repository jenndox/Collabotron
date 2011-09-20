var Spring = function () {
    this.springConstant = 0.0018;
    this.damperConstant = 0.6;
    this.target = 0;
    this.current = 0;
    this.velocity = 0;
    this.lastTime = -0.5;
    this.hasSettled = true;
}

Spring.prototype.animate = function (target) {
    this.target = target;
    if (this.hasSettled == true) {
        this.velocity = 0;
        this.lastTime = -0.5;
    }
    this.hasSettled = false;
}

Spring.prototype.stop = function () {
    this.target = this.current;
    this.velocity = 0;
    this.lastTime = -0.5
    this.hasSettled = true;
}

Spring.prototype.setCurrentAndTarget = function (value) {
    this.current = this.target = value;
    this.velocity = 0;
    this.lastTime = -0.5;
    this.hasSettled = false;
}

Spring.prototype.setCurrentToTarget = function () {
    this.current = this.target;
    this.velocity = 0;
    this.lastTime = -0.5
    this.hasSettled = false;
}

Spring.prototype.update = function (time) {
    var delta = 0.0;
    if (this.hasSettled == true) {
        return true;
    }
    else if (this.lastTime >= 0.0) {
        var dt = (time - this.lastTime) * 1000.0;
        if (dt <= 0.0) {
            return false;
        }

        var curTargDiff = this.current - this.target;
        this.velocity += -this.springConstant * curTargDiff - this.damperConstant * this.velocity;
        delta = this.velocity * dt;

        var maxDelta = -curTargDiff;
        if (((delta > 0.0) && (maxDelta > 0.0) && (maxDelta < delta)) ||
            ((delta < 0.0) && (maxDelta < 0.0) && (maxDelta > delta))) {
            delta = maxDelta;
            this.velocity = 0.0;
        }

        this.current += delta;
    }
    else {
        this.lastTime = time;
        return false;
    }

    var newCurTargDiff = this.current - this.target;
    if ((newCurTargDiff < 1e-5) && (newCurTargDiff > -1e-5) &&
        (delta < 1e-5) && (delta > -1e-5)) {
        this.hasSettled = true;
        this.current = this.target;
        this.lastTime = -0.5;
    }
    else {
        this.lastTime = time;
    }

    return false;
}
