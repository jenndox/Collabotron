var isIE = (window.navigator.userAgent.indexOf("MSIE") >= 0);
var mainCanvas = null;
var triangle = null;
var viewport = null;

var sliders = [ "popularity", "nearby", "colors"];

var xFactor = 2;
var yFactor = 2;
var sizeFactor = 1;
var equipmentName = "";
var foundEquipment = "";
var forceRender = true;
var showBubbles = true;
var mode = "text";

var cLow  = 0;
var cHigh = 100;
var mLow  = 0;
var mHigh = 100;
var yLow  = 0;
var yHigh = 100;


function onLoad() {
  mainCanvas = document.getElementById('canvas');
  if(mainCanvas.getContext)
  {
    mainCanvas.onresize = function() {
        forceRender = true;
    };

    triangle = new Triangle();
    viewport = new Viewport();
    viewport.frame = [0, 0, mainCanvas.width, mainCanvas.height];
    viewport.sceneBounds = triangle.frame;
    viewport.zoomToFit(10);
    setupEquipmentInput();
    setInterval(tick, 33);

    forceRender = true;
    tick();
  }
}

function renderEquipments() {
    var ctx = mainCanvas.getContext("2d");
    var canvasWidth = mainCanvas.width;
    var canvasHeight = mainCanvas.height;

    clearCanvas(ctx, mainCanvas);

    // Create a clipping path
    ctx.beginPath();
    ctx.moveTo(0, 0 );
    ctx.lineTo(0, 800 );
    ctx.lineTo(620, 800);
    ctx.lineTo(620, 0);
    ctx.lineTo(0, 0);
    ctx.clip();

    ctx.save();

    var sxy = viewport.sceneToScreen(0, 0);
    var vx = sxy[0];
    var vy = sxy[1];
    var vs = viewport.cameraScale.current;
    ctx.scale(vs, vs);
    ctx.translate(vx / vs, vy / vs);

    clearCanvas(ctx, mainCanvas);

    drawColors();

    ctx.font = "30px georgia";
    triangle.search(ctx, equipmentName, sliders[xFactor], sliders[yFactor], sliders[sizeFactor], showBubbles);

    ctx.restore();
}

function clearCanvas(context, mainCanvas) 
{
    context.clearRect(0, 0, 700, 700);
}

function setCursor(canvas, name) {
    switch (name) {
        case null:
        case "":
        case "default":
        case "arrow":
            canvas.style.cursor = "";
            break;
        case "hand":
            canvas.style.cursor = "pointer";
            break;
    }
}

function setupEquipmentInput() {
    var leftMouseDown = false;
    var lastMouseX = 0, lastMouseY = 0;
    var lastMouseX1 = 0, lastMouseY1 = 0;

    var mouseDelta = 0;
    var ctrlDown = false;
    var shiftDown = false;

    var selectedElement = null;

    var handlers = {};

    handlers.onMouseDown = function (button, x, y, el) {
        leftMouseDown = true;
        setCursor(mainCanvas, "hand");
        lastMouseX = x;
        lastMouseY = y;

        if (shiftDown == true) {
            var sxy = viewport.screenToScene(x, y);
        }
    }

    handlers.onMouseUp = function (button, x, y, el) {
        leftMouseDown = false;
        setCursor(mainCanvas, null);

        if (mouseDelta < 4) {
            if (shiftDown == true) {
                // Zoom in
                var newScale = viewport.cameraScale.current * 2.0;
                viewport.stopPan();
                viewport.zoomToScaleKeepingViewPointConstant(newScale, x - 80, y - 250, 1.0);
            } else if (ctrlDown == true) {
                // Zoom out
                var newScale = viewport.cameraScale.current / 3.0;
                viewport.stopPan();
                viewport.zoomToScaleKeepingViewPointConstant(newScale, x - 80, y - 250, 1.0);
            } else {
                // Zoom
                var newScale = viewport.cameraScale.current * 3.0;
                viewport.stopPan();
                viewport.zoomToScaleKeepingViewPointConstant(newScale, x - 80, y - 250, 1.0);

                // Find the closest equipment
                var sxy = viewport.screenToScene(x, y);
                triangle.findClosest(mainCanvas.getContext("2d"), sxy[0], sxy[1], viewport.cameraScale.current);

            }
        }
        mouseDelta = 0;
    }

    handlers.onMouseMove = function (x, y) {
        if (leftMouseDown == true) {

            var vx = viewport.cameraOriginX.target;
            var vy = viewport.cameraOriginY.target;
            var vs = viewport.cameraScale.current;
            mouseDelta += Math.abs(lastMouseX - x) + Math.abs(lastMouseY - y);
            var dx = (lastMouseX - x) / vs;
            var dy = (lastMouseY - y) / vs;
            if ((dx != 0) || (dy != 0)) {
                vx += dx;
                vy += dy;
                viewport.setCamera(vs, vx, vy, 1.0);
            }
        }
        lastMouseX = x;
        lastMouseY = y;
    }

    handlers.onMouseWheel = function (delta, x, y, el) {
        if (shiftDown == true) {
            var sxy = viewport.screenToScene(x, y);
        } else {
            var newScale = viewport.cameraScale.current;
            if (delta < 0) {
                newScale /= 3.0;
            } else {
                newScale *= 2.0;
            }
            viewport.stopPan();
            viewport.zoomToScaleKeepingViewPointConstant(newScale, x - 80, y - 250, 1.0);
        }
    }

    handlers.onTouchStart = function (button, x, y, el) {
        setCursor(mainCanvas, "hand");
        lastMouseX = x;
        lastMouseY = y;
    }

    handlers.onTouchEnd = function (button, x, y, el) {
        setCursor(mainCanvas, null);

        if (mouseDelta < 4) {
            // Zoom
            var newScale = viewport.cameraScale.current * 3.0;
            viewport.stopPan();
            viewport.zoomToScaleKeepingViewPointConstant(newScale, x - 80, y - 250, 1.0);

            // Find the closest equipment
            var sxy = viewport.screenToScene(x, y);
            triangle.findClosest(mainCanvas.getContext("2d"), sxy[0], sxy[1], viewport.cameraScale.current);
        }
        mouseDelta = 0;
    }

    handlers.onTouchMove = function (x, y) {
        var vx = viewport.cameraOriginX.target;
        var vy = viewport.cameraOriginY.target;
        var vs = viewport.cameraScale.current;
        mouseDelta += Math.abs(lastMouseX - x) + Math.abs(lastMouseY - y);
        var dx = (lastMouseX - x) / vs;
        var dy = (lastMouseY - y) / vs;
        if ((dx != 0) || (dy != 0)) {
            vx += dx;
            vy += dy;
            viewport.setCamera(vs, vx, vy, 1.0);
        }
        lastMouseX = x;
        lastMouseY = y;
    }


    handlers.onGestureStart = function (button, x1, y2, x2, y2,  el) {
        setCursor(mainCanvas, "hand");
        lastMouseX = x1;
        lastMouseY = y1;
        lastMouseX1 = x2;
        lastMouseY1 = y2;
    }

    handlers.onGestureEnd = function (button, x1, y2, x2, y2, el) {
        setCursor(mainCanvas, null);
        var newScale = viewport.cameraScale.current;
        if (delta < 0) {
            newScale /= 3.0;
        } else {
            newScale *= 2.0;
        }
        viewport.stopPan();
        viewport.zoomToScaleKeepingViewPointConstant(newScale, (x1 + x2) /2 - 80, (y1 + y2) /2 - 250, 1.0);
    }

    handlers.onGestureChange = function (delta, x1, y2, x2, y2, el) {
        var newScale = scale;
        viewport.stopPan();
        viewport.zoomToScaleKeepingViewPointConstant(newScale, (x1 + x2) /2 - 80, (y1 + y2) /2 - 250, 1.0);
    }


    handlers.onKeyDown = function (keyCode) {
         switch (keyCode) {
            case 16: // shift
                shiftDown = true;
                return true;
            case 17: // ctrl
                ctrlDown = true;
                return true;
            case 32:
                return true;
        }
        return false;
    }

    handlers.onKeyUp = function (keyCode) {
        switch (keyCode) {
            case 16: // shift
               shiftDown = false;
               return true;
            case 17: // ctrl
                ctrlDown = false;
                return true;
            case 32: // space
                viewport.zoomToFit(3.0);
                return true;
        }
        return false;
    }

    setupInput(mainCanvas, handlers);
}

function tick() {
    var time = (new Date()).getTime() / 1000.0;
    var needsRender = forceRender;
    forceRender = false;
    viewport.frame = [0, 0, window.innerWidth, window.innerHeight];

    if (viewport.update(time)) {
        needsRender = true;
    }

    if (needsRender) {
        if (mode == "colors")
            searchByColor();
        else
            renderEquipments();
    }
}

function xFactorUpdate(newValue) {
  if (xFactor != newValue)
  {
    xFactor = newValue;
    renderEquipments();
  }
}

function yFactorUpdate(newValue) {
  if (yFactor != newValue)
  {
    yFactor = newValue;
    renderEquipments();
  }
}

function sizeFactorUpdate(newValue) {
  if (sizeFactor != newValue)
  {
    sizeFactor = newValue;
    renderEquipments();
  }
}

function searchEquipments() {
    var ctx = mainCanvas.getContext("2d");

    clearCanvas(ctx, mainCanvas);
    var width = mainCanvas.width;
    mainCanvas.width = 1;
    mainCanvas.width = width;

    ctx.font = "30px georgia";

    triangle = new Triangle();
    mode = "text";
    triangle.search(ctx, equipmentName, sliders[xFactor], sliders[yFactor], sliders[sizeFactor], showBubbles);
}

function searchByColor() {
    var ctx = mainCanvas.getContext("2d");
    var canvasWidth = mainCanvas.width;
    var canvasHeight = mainCanvas.height;

    clearCanvas(ctx, mainCanvas);

    // Create a clipping path
    ctx.beginPath();
    ctx.moveTo(0, 0 );
    ctx.lineTo(0, 800 );
    ctx.lineTo(620, 800);
    ctx.lineTo(620, 0);
    ctx.lineTo(0, 0);
    ctx.clip();

    ctx.save();

    var sxy = viewport.sceneToScreen(0, 0);
    var vx = sxy[0];
    var vy = sxy[1];
    var vs = viewport.cameraScale.current;
    ctx.scale(vs, vs);
    ctx.translate(vx / vs, vy / vs);

    clearCanvas(ctx, mainCanvas);

    drawColors();

    ctx.font = "30px georgia";
    mode = "colors";
    triangle.searchColor(ctx, sliders[sizeFactor], showBubbles, cHigh, cLow, mHigh, mLow, yHigh, yLow );

    ctx.restore();
}


function updateEquipmentSearch(newValue) {
    equipmentName = newValue;
    // Evenutally we can do autosuggest here.
}

function triangleView() {
    var ctx = mainCanvas.getContext("2d");

    clearCanvas(ctx, mainCanvas);
    var width = mainCanvas.width;
    mainCanvas.width = 1;
    mainCanvas.width = width;
    xFactor = 3;
    yFactor = 3;

    ctx.font = "30px georgia";

    triangle = new Triangle();
    triangle.search(ctx, equipmentName, sliders[xFactor], sliders[yFactor], sliders[sizeFactor], showBubbles);
}