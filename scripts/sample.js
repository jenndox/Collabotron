   <script type="text/javascript">
        var isIE = (window.navigator.userAgent.indexOf("MSIE") >= 0);

        var viewport = null;
        var scene = null;

        var displayCanvas = null;
        var timelineCanvas = null;

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

        function setupDisplayInput(canvas) {
            var leftMouseDown = false;
            var lastMouseX = 0, lastMouseY = 0;
            var mouseDelta = 0;
            var ctrlDown = false;
            var shiftDown = false;

            var selectedElement = null;

            var handlers = {};

            handlers.onMouseDown = function (button, x, y, el) {
                console.log("onMouseDown(" + button + ", " + x + ", " + y + ")");
                leftMouseDown = true;
                setCursor(canvas, "hand");
                lastMouseX = x;
                lastMouseY = y;

                if (shiftDown == true) {
                    var sxy = viewport.screenToScene(x, y);
                }
            }

            handlers.onMouseUp = function (button, x, y, el) {
                console.log("onMouseUp(" + button + ", " + x + ", " + y + ")");
                leftMouseDown = false;
                setCursor(canvas, null);

                if (mouseDelta < 4) {
                    if (shiftDown == true) {
                        var sxy = viewport.screenToScene(x, y);
                    } else if (ctrlDown == true) {
                        // Zoom out
                        var newScale = viewport.cameraScale.current / 4.0;
                        viewport.stopPan();
                        viewport.zoomToScaleKeepingViewPointConstant(newScale, x, y, 1.0);
                    } else {
                        // Zoom in
                        var newScale = viewport.cameraScale.current * 2.5;
                        viewport.stopPan();
                        viewport.zoomToScaleKeepingViewPointConstant(newScale, x, y, 1.0);
                    }
                }
                mouseDelta = 0;
            }

            handlers.onMouseMove = function (x, y) {
                //console.log("onMouseMove(" + x + ", " + y + ")");

                if (selectedElement) {
                } else if (leftMouseDown == true) {
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
                console.log("onMouseWheel(" + delta + ", " + x + ", " + y + ")");

                if (shiftDown == true) {
                    var sxy = viewport.screenToScene(x, y);
                } else {
                    var newScale = viewport.cameraScale.current;
                    if (delta < 0) {
                        newScale /= 4.0;
                    } else {
                        newScale *= 2.5;
                    }
                    viewport.stopPan();
                    viewport.zoomToScaleKeepingViewPointConstant(newScale, x, y, 1.0);
                }
            }

            handlers.onKeyDown = function (keyCode) {
                //console.log("onKeyDown(" + keyCode + ")");

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
                console.log("onKeyUp(" + keyCode + ")");

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

            setupInput(canvas, handlers);
        }

        function setupTimelineInput(canvas) {
            var leftMouseDown = false;

            var handlers = {};

            handlers.onMouseDown = function (button, x, y, el) {
                console.log("timeline onMouseDown(" + button + ", " + x + ", " + y + ")");
                setCursor(canvas, "hand");
                leftMouseDown = true;
            }

            handlers.onMouseUp = function (button, x, y, el) {
                console.log("timeline onMouseUp(" + button + ", " + x + ", " + y + ")");
                setCursor(canvas, null);

                if (leftMouseDown) {
                    if (playbackInterval == -1) {
                        resumePlayback();
                    } else {
                        pausePlayback();
                    }
                }

                leftMouseDown = false;
            }

            setupInput(canvas, handlers);
        }

        var scene = null;

        function drawYearMarker(ctx, x, y, year) {
            ctx.fillStyle = "rgb(255,255,255)";
            ctx.fillRect(x, y - 15, 2, 30);

            ctx.font = "38px Arial";
            var measure = ctx.measureText(year);

            ctx.save();
            ctx.translate(x + 8, y - 10);
            //ctx.rotate(Math.PI / 2);
            ctx.fillStyle = "rgba(255,255,255,0.5)";
            ctx.fillText(year, 0, 0);
            ctx.restore();
        }

        function drawMonthMarker(ctx, x, y, month) {
            ctx.fillStyle = "rgba(255,255,255,0.5)";
            ctx.fillRect(x, y - 5, 2, 10);
        }

        function drawEvent(ctx, x, y, event) {
            ctx.fillStyle = "rgba(255,228,0,0.7)";
            ctx.fillRect(x, y - 10, 20, 20);

            ctx.font = "8pt Arial";
            var measure = ctx.measureText(event.name);

            ctx.save();
            ctx.translate(x - measure.width / 2 + 10, y - 20);
            ctx.fillStyle = "rgba(255,255,255,1)";
            ctx.fillText(event.name, 0, 0);
            ctx.restore();
        }

        function drawCurrentTime(ctx, x, y) {
            ctx.fillStyle = "rgb(253,120,0)";
            ctx.fillRect(x - 2, y - 20, 4, 40);
        }
        
        var cachedTimelineBackground = document.createElement("canvas");
        
        function renderTimelineBackground() {
            if (cachedTimelineBackground.width == timelineCanvas.width) {
                return;
            }
            
            var canvasWidth = timelineCanvas.width;
            var canvasHeight = timelineCanvas.height;
            var ctx = cachedTimelineBackground.getContext("2d");
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            
            cachedTimelineBackground.width = timelineCanvas.width;
            cachedTimelineBackground.height = timelineCanvas.height;
            
            var lineY = timelineCanvas.height - 3;
            
            // Background sizing info
            var sizex = 0;
            var curtime = scene.startDate;
            function calculateLiving(time) {
                var count = 0;
                for (var n = 0; n < scene.people.length; n++) {
                    var person = scene.people[n];
                    if ((person.startDate <= time) && (time <= person.endDate)) {
                        count++;
                    }
                }
                return count;
            }
            var daysperpixel = 1 / (canvasWidth / (scene.totalMonths * 30));
            var pixelLiving = [];
            var largest = 0;
            for (var n = 0; n < canvasWidth; n++) {
                curtime += (daysperpixel * 24 * 60 * 60 * 1000);
                var living = calculateLiving(curtime);
                largest = Math.max(largest, living);
                pixelLiving[n] = living;
            }
            ctx.beginPath();
            ctx.fillStyle = "rgba(200,200,200,0.5)";
            ctx.strokeStyle = "rgba(255,255,255,0.8)";
            ctx.moveTo(0, lineY);
            for (var n = 0; n < canvasWidth; n++) {
                var y = pixelLiving[n] / 3;
                ctx.lineTo(n, lineY - y);
            }
            ctx.fill();
            ctx.stroke();
        }

        function renderTimeline() {
            var canvasWidth = timelineCanvas.width;
            var canvasHeight = timelineCanvas.height;
            var ctx = timelineCanvas.getContext("2d");
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            ctx.save();

            var dxyear = canvasWidth / scene.totalYears;
            var dxmonth = canvasWidth / scene.totalMonths;

            var lineY = canvasHeight - 3;
            
            //
            renderTimelineBackground();
            ctx.drawImage(cachedTimelineBackground, 0, 0);

            // Master line
            var lineRadius = 1;
            ctx.fillStyle = "rgba(255,255,255,0.4)";
            ctx.fillRect(-1, lineY - lineRadius, canvasWidth + 2, lineRadius * 2);
            ctx.strokeStyle = "rgba(240,240,240,0.4)";
            ctx.strokeRect(-1, lineY - lineRadius, canvasWidth + 2, lineRadius * 2);

            // Year markers
            var yearx = 0;
            for (var n = 0; n < scene.totalYears; n++, yearx += dxyear) {
                drawYearMarker(ctx, yearx, lineY, n + scene.startYear);
            }

            // Month markers
            var monthx = 0;
            for (var n = 0; n < scene.totalMonths; n++, monthx += dxmonth) {
                var month = (n) % 12 + 1;
                drawMonthMarker(ctx, monthx, lineY, month);
            }

            // Events
            for (var n = 0; n < scene.majorEvents.length; n++) {
                var event = scene.majorEvents[n];
                var diff = event.date - scene.startDate;
                var years = diff / 31536000000;
                var eventx = dxyear * years;
                drawEvent(ctx, eventx, lineY, event);
            }

            // Current time marker
            {
                var dateDiff = scene.currentDate - scene.startDate;
                var years = dateDiff / 31536000000;
                var currentx = dxyear * years;
                drawCurrentTime(ctx, currentx, lineY);
            }

            ctx.restore();
        }

        function renderDisplay() {
            var canvasWidth = displayCanvas.width;
            var canvasHeight = displayCanvas.height;
            var ctx = displayCanvas.getContext("2d");
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            ctx.save();

            var sxy = viewport.sceneToScreen(0, 0);
            var vx = sxy[0];
            var vy = sxy[1];
            var vs = viewport.cameraScale.current;
            ctx.scale(vs, vs);
            ctx.translate(vx / vs, vy / vs);

            //var x = 0;
            //var y = 0;
            //var w = 100;
            //var h = 100;
            //ctx.fillStyle = "rgb(255,255,255)";
            //ctx.fillRect(x, y, w, h);

            scene.draw(ctx);

            ctx.restore();
        }

        var forceDisplayRender = false;
        var forceTimelineRender = false;

        var playbackInterval = -1;
        var onemin = 60000;
        var onehr = onemin * 60;
        var oneday = onehr * 24;
        var queryMultiplier = window.location.hash.substring(1);
        var timePerTick = oneday * (queryMultiplier ? queryMultiplier : 1);

        function playbackTick() {
            var time = (new Date()).getTime() / 1000.0;

            forceTimelineRender = true;
            if (scene.stepTime(timePerTick)) {
            } else {
                pausePlayback();
            }
            
            if (scene.update(time)) {
                forceDisplayRender = true;
            }
        }

        function resumePlayback() {
            queryMultiplier = window.location.hash.substring(1);
            timePerTick = oneday * (queryMultiplier ? queryMultiplier : 1);

            playbackInterval = setInterval(playbackTick, 33);
        }

        function pausePlayback() {
            clearInterval(playbackInterval);
            playbackInterval = -1;
        }

        function tick() {
            var time = (new Date()).getTime() / 1000.0;
            var displayNeedsRender = forceDisplayRender;
            var timelineNeedsRender = forceTimelineRender;
            forceDisplayRender = false;
            forceTimelineRender = false;

            viewport.frame = [0, 0, window.innerWidth, window.innerHeight];
            if ((displayCanvas.width != window.innerWidth) || (displayCanvas.height != window.innerHeight)) {
                displayCanvas.width = window.innerWidth;
                displayCanvas.height = window.innerHeight;
                displayNeedsRender = true;
            }

            if (timelineCanvas.width != window.innerWidth) {
                timelineCanvas.width = window.innerWidth;
            }

            if (viewport.update(time)) {
                displayNeedsRender = true;
            }

            if (displayNeedsRender) {
                renderDisplay();
            }
            if (timelineNeedsRender) {
                renderTimeline();
            }
        }

        function onLoad() {
            displayCanvas = document.getElementById("display");
            timelineCanvas = document.getElementById("timeline");
            timelineCanvas.onresize = function() {
                forceTimelineRender = true;
            };

            scene = new Scene();

            viewport = new Viewport();
            viewport.frame = [0, 0, window.innerWidth, window.innerHeight];
            viewport.sceneBounds = scene.frame;
            viewport.zoomToFit();

            setupDisplayInput(displayCanvas);
            setupTimelineInput(timelineCanvas);

            setInterval(tick, 33);

            forceTimelineRender = true;
            tick();

            //resumePlayback();
        }
    </script>