var Keyframe = function (time, target, x, y, scale, opacity) {
    this.target = target;
    this.startTime = time;
    this.duration = 1000;
    this.endTime = this.startTime + this.duration;
    this.x = x;
    this.y = y;
    this.scale = scale;
    this.opacity = opacity;
};

var Animation = function (time, keyframe) {
    this.keyframe = keyframe;
    this.startTime = time;
    this.sx = keyframe.target.x;
    this.sy = keyframe.target.y;
    this.sscale = keyframe.target.scale;
    this.sopacity = keyframe.target.opacity;
};
Animation.prototype.update = function (time) {
    var dt = Math.min(0.1, (time - this.startTime) / this.keyframe.duration);
    var target = this.keyframe.target;
    target.x = this.sx + dt * (this.keyframe.x - this.sx);
    target.y = this.sy + dt * (this.keyframe.y - this.sy);
    target.scale = this.sscale + dt * (this.keyframe.scale - this.sscale);
    target.opacity = this.sopacity + dt * (this.keyframe.opacity - this.sopacity);

    if (dt >= 0.1) {
        target.x = this.keyframe.x;
        target.y = this.keyframe.y;
        target.scale = this.keyframe.scale;
        target.opacity = this.keyframe.opacity;
        return false;
    } else {
        return true;
    }
};

var AnimationScheduler = function () {
    this.keyframes = [];
    this.nextTime = Number.MAX_VALUE;
    this.nextIndex = 0;
    this.active = [];
};

AnimationScheduler.prototype.addKeyframe = function (time, target, x, y, scale, opacity) {
    if (isNaN(time)) {
        console.log("bad time");
    }
    var keyframe = new Keyframe(time, target, x, y, scale, opacity);
    this.keyframes.push(keyframe);
};

AnimationScheduler.prototype.prepare = function () {
    this.keyframes.sort(function (a, b) {
        return a.startTime - b.startTime;
    });
    if (this.keyframes.length > 0) {
        this.nextTime = this.keyframes[0].startTime;
    }
};

AnimationScheduler.prototype.reset = function () {
    this.nextIndex = 0;
    if (this.keyframes.length > 0) {
        this.nextTime = this.keyframes[0].startTime;
    }
};

AnimationScheduler.prototype.dequeueKeyframe = function (time) {
    var keyframe = this.keyframes[this.nextIndex];
    this.nextIndex++;
    if (this.nextIndex >= this.keyframes.length) {
        // Done
        this.nextTime = Number.MAX_VALUE;
    } else {
        this.nextTime = this.keyframes[this.nextIndex].startTime;
    }
    var animation = new Animation(time, keyframe);
    this.active.push(animation);
};

AnimationScheduler.prototype.update = function (time) {
    var anyChanged = false;

    while (time >= this.nextTime) {
        this.dequeueKeyframe(time);
        anyChanged = true;
    }

    // Process active
    for (var n = 0; n < this.active.length; ) {
        var animation = this.active[n];
        if (animation.update(time)) {
            // Still running
            n++;
        } else {
            // Dead
            // TODO: faster removal
            this.active.splice(n, 1);
        }
        anyChanged = true;
    }

    return anyChanged;
};

