var Viewport = function () {
    this.frame = [0, 0, 100, 100];
    this.sceneBounds = [0, 0, 1, 1];
    this.cameraOriginChanging = false;
    this.cameraScaleChanging = false;
    this.cameraOriginX = new Spring();
    this.cameraOriginY = new Spring();
    this.cameraScale = new Spring();
    this.cameraScale.setCurrentAndTarget(1.0);
    this.cameraZoomCenterX = 0.0;
    this.cameraZoomCenterY = 0.0;
    this.dirty = true;
}

Viewport.prototype.sceneToScreen = function (x, y) {
    return [(x - this.cameraOriginX.current) * this.cameraScale.current, (y - this.cameraOriginY.current) * this.cameraScale.current];
}

Viewport.prototype.screenToScene = function (x, y) {
    return [this.cameraOriginX.current + x / this.cameraScale.current, this.cameraOriginY.current + y / this.cameraScale.current];
}

Viewport.prototype.update = function (time) {
    var anythingChanged = this.dirty;
    this.dirty = false;

    var needsCancel = false;
    var changing;

    var frameCenterX = this.frame[2] / 2.0;
    var frameCenterY = this.frame[3] / 2.0;
    //if ((this.cameraZoomCenterX == frameCenterX) && (this.cameraZoomCenterY == frameCenterY))
    {
        var oldZoomDistanceX = this.cameraZoomCenterX - frameCenterX;
        var oldZoomDistanceY = this.cameraZoomCenterY - frameCenterY;
        var newZoomDistanceX = oldZoomDistanceX;
        var newZoomDistanceY = oldZoomDistanceY;
        oldZoomDistanceX /= this.cameraScale.current;
        oldZoomDistanceY /= this.cameraScale.current;

        changing = !this.cameraScale.update(time);
        if (changing == false) {
            this.cameraZoomCenterX = frameCenterX;
            this.cameraZoomCenterY = frameCenterY;
        }

        newZoomDistanceX /= this.cameraScale.current;
        newZoomDistanceY /= this.cameraScale.current;
        var addToPanX = oldZoomDistanceX - newZoomDistanceX;
        var addToPanY = oldZoomDistanceY - newZoomDistanceY;
        this.cameraOriginX.current += addToPanX;
        this.cameraOriginY.current += addToPanY;
        this.cameraOriginX.target += addToPanX;
        this.cameraOriginY.target += addToPanY;
    }
    //else {
    //    changing = !SDXSpring1DStep( &this.cameraScale, time );
    //}
    if (changing == true) {
        anythingChanged = true;
    }
    if (this.cameraScaleChanging != changing) {
        needsCancel = true;
    }
    this.cameraScaleChanging = changing;
    var changingX = !this.cameraOriginX.update(time);
    var changingY = !this.cameraOriginY.update(time);
    changing = changingX || changingY;
    if (changing == true) {
        anythingChanged = true;
    }
    if (this.cameraOriginChanging != changing) {
        needsCancel = true;
    }
    this.cameraOriginChanging = changing;
    if (needsCancel == true) {
        // No longer changing - cancel pending requests
        anythingChanged = true;
    }
    return anythingChanged;
}

Viewport.prototype.zoomToFit = function (duration) {
    this.zoomToBounds(this.sceneBounds, duration);
}

Viewport.prototype.zoomToBounds = function (bounds, duration) {
    var minimumScale = 0.1;
    var maximumScale = 10.0;
    var currentScale = this.cameraScale.current;

    var frame = this.frame;

    var targetWidth;
    var targetHeight;
    var boundsRatio = bounds[2] / bounds[3];
    if (frame[2] >= frame[3]) {
        targetWidth = frame[2];
        targetHeight = targetWidth / boundsRatio;
        if (targetHeight > frame[3]) {
            targetHeight = frame[3];
            targetWidth = targetHeight * boundsRatio;
        }
    }
    else {
        targetHeight = frame[3];
        targetWidth = targetHeight * boundsRatio;
        if (targetWidth > frame[2]) {
            targetWidth = frame[2];
            targetHeight = targetWidth / boundsRatio;
        }
    }

    var scaleX = frame[2] / bounds[2];
    var scaleY = frame[3] / bounds[3];
    var newScale = Math.min(scaleX, scaleY);
    newScale = Math.min(newScale, 2);
    newScale = Math.max(newScale, 1);
    var x = ((frame[2] / 2.0) - (targetWidth / 2.0)) / newScale - bounds[0];
    var y = ((frame[3] / 2.0) - (targetHeight / 2.0)) / newScale - bounds[1];

    if (duration) {
        if (Math.abs(1 - (newScale / currentScale)) < 0.1) {
            this.cameraOriginX.animate(-x, duration);
            this.cameraOriginY.animate(-y, duration);
            this.cameraScale.animate(newScale, duration);
        }
        else {
            var addToPanX = -x - this.cameraOriginX.current;
            var addToPanY = -y - this.cameraOriginY.current;
            var multiplier = (currentScale * newScale) / (newScale - currentScale);
            var distanceX = addToPanX * multiplier;
            var distanceY = addToPanY * multiplier;

            this.cameraZoomCenterX = distanceX + this.frame[2] / 2.0;
            this.cameraZoomCenterY = distanceY + this.frame[3] / 2.0;

            this.cameraOriginX.stop();
            this.cameraOriginY.stop();
            this.cameraScale.animate(newScale, duration);
        }
    }
    else {
        this.cameraOriginX.setCurrentAndTarget(-x);
        this.cameraOriginY.setCurrentAndTarget(-y);
        this.cameraScale.setCurrentAndTarget(newScale);
    }

    this.dirty = true;
}

Viewport.prototype.zoomToScaleKeepingViewPointConstant = function (newScale, mx, my, duration) {
    var currentScale = this.cameraScale.current;
    var currentOriginX = this.cameraOriginX.current; // + 450;
    var currentOriginY = this.cameraOriginY.current; // + 350;

    if (duration) {
        this.cameraScale.animate(newScale, duration);
        this.cameraZoomCenterX = mx + this.frame[2] / 2.0;
        this.cameraZoomCenterY = my + this.frame[3] / 2.0;
    } else {
        this.cameraScale.animate(newScale, duration);
        this.cameraZoomCenterX = mx + this.frame[2] / 2.0;
        this.cameraZoomCenterY = my + this.frame[3] / 2.0;
        var newPositionX = currentOriginX + (mx / currentScale);
        var newPositionY = currentOriginY + (my / currentScale);

        this.cameraOriginX.setCurrentAndTarget(newPositionX);
        this.cameraOriginY.setCurrentAndTarget(newPositionY);
        this.cameraScale.setCurrentAndTarget(newScale);
    }

    this.dirty = true;
}

Viewport.prototype.setCamera = function (newScale, newPositionX, newPositionY, duration) {
    if (duration) {
        if ((newPositionX != this.cameraOriginX.current) || (newPositionY != this.cameraOriginY.current)) {
            this.cameraOriginX.animate(newPositionX, duration);
            this.cameraOriginY.animate(newPositionY, duration);
        }
        if (newScale != this.cameraScale.target) {
            this.cameraScale.animate(newScale, duration);
        }
    } else {
        this.cameraOriginX.setCurrentAndTarget(newPositionX);
        this.cameraOriginY.setCurrentAndTarget(newPositionY);
        this.cameraScale.setCurrentAndTarget(newScale);
    }

    this.dirty = true;
}

Viewport.prototype.stopPan = function () {
    this.cameraOriginX.stop();
    this.cameraOriginY.stop();
}

Viewport.prototype.stop = function () {
    this.cameraOriginX.stop();
    this.cameraOriginY.stop();
    this.cameraScale.stop();
}
