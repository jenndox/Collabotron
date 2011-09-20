function drawColors() {
  var canvas = document.getElementById('canvas');
  if(canvas.getContext)
  {
    var canvasContext = canvas.getContext('2d');

    canvasContext.save();
    canvasContext.translate(300, -180);

    var height = 433;
    var width = 500;
    var triX = 0;
    var triY = 0;
    var middleX = width / 2 + triX;
    var middleY = height * .577 + triY;

    // Create a triangle clipping path
    canvasContext.beginPath();
    canvasContext.moveTo(middleX,0 );
    canvasContext.lineTo(0, height);
    canvasContext.lineTo(width, height);
    canvasContext.clip();

    var lineargradient = canvasContext.createLinearGradient(middleX,10,middleX,height );
    lineargradient.addColorStop(1,'rgba(30,30,30,0)');
    lineargradient.addColorStop(0,'#00ffff');

    canvasContext.fillStyle = lineargradient;
    canvasContext.fillRect(0,0,width,height);

    var lineargradient2 = canvasContext.createLinearGradient(10, middleY * 2, middleX*1.577,middleY*.577);
    lineargradient2.addColorStop(1,'rgba(30,30,30,0)');
    lineargradient2.addColorStop(0,'#ff00ff');

    canvasContext.fillStyle = lineargradient2;
    canvasContext.fillRect(0,0,width,height);

    var lineargradient3 = canvasContext.createLinearGradient(middleX *2, middleY * 2,middleX * .422,middleY*.577);
    lineargradient3.addColorStop(1,'rgba(30,30,30,0)');
    lineargradient3.addColorStop(0,'#ffff00');

    canvasContext.fillStyle = lineargradient3;
    canvasContext.fillRect(0,0,width,height);

    canvasContext.restore();
  }
}
