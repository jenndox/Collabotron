var squareCt = 600;
var squareLg = 2;
var pixelSquare = new Array();

var Equipment = function (name, art, craft, tech, nearby) {
    this.name = name;
    this.art = art;
    this.craft = craft;
    this.tech = tech;
    this.soon = soon;
    this.x = 0;
    this.y = 0;
    this.size = 0;
    this.draw = true;
};

Equipment.prototype.inColorRange = function (cHigh, cLow, mHigh, mLow, yHigh, yLow) {
    
    if ((this.art > cHigh) || (this.art < cLow) ||
        (this.craft > mHigh) || (this.craft < mLow) ||
        (this.tech > yHigh) || (this.tech < yLow)) {

        return false;
    }
    else {
        return true;
    }
};

Equipment.prototype.canFit = function (x, y, size) {
    size -= 1;
    var length = squareLg;
    var startX = Math.round((x - size)/squareLg) + 400;
    var startY = Math.round((y - size)/squareLg) + 400;
    var canFit = true;

    for (var i=0; i < size; i++)
    {
        for (var j=0; j < size; j++)
        {
            var place = (startY + j - 1) * squareCt + (startX + i - 1);
            if(pixelSquares[place] == true) {
                canFit = false;
            }
        }
    }
    if (canFit)
    { 

       for (var i=0; i < size; i++)
        {
            for (var j=0; j < size; j++)
            {
                var place = (startY + j) * squareCt + (startX + i);
                pixelSquares[place] = true;
            }
        }
    }
    return canFit;
};

Equipment.prototype.drawBubbles = function (ctx, xVar, yVar, sizeVar, showBubbles) {
    ctx.save();
    var xFactor = this.nearby;
    var yFactor = this.popularity;
    var sizeFactor = this.soon;

    var oldX = this.x;
    var oldY = this.y;
    var oldSize = this.size;

    cColor = this.art / 100;
    mColor = this.craft / 100;
    yColor = this.tech / 100;
    kColor = 0;

    switch (xVar) {
        case "popularity":
            xFactor = this.popularity;
            break; 
        case "nearby":
            xFactor = this.nearby;
            break; 
        case "soon":
            xFactor = this.soon;
            break;
        case "colors":
            // Calculate isometric projection
            xFactor = (((this.tech-this.craft) * 0.8944) * 1/2 + 36) * 5/2;
            break;
        default:
            xFactor = this.popularity;
            break;
    } 
    switch (yVar) {
        case "popularity":
            yFactor = this.popularity;
            break; 
        case "nearby":
            yFactor = this.nearby;
            break; 
        case "soon":
            yFactor = this.soon;
            break;
        case "colors":
            // Calculate isometric projection
            yFactor = (((this.tech + this.craft)* 0.4472 - this.art) * 1/2 + 32) * 5/2;
            break;
        default:
            yFactor = this.popularity;
            break;
    } 
    switch (sizeVar) {
        case "popularity":
            sizeFactor = this.popularity;
            break; 
        case "nearby":
            sizeFactor = this.nearby;
            break; 
        case "soon":
            sizeFactor = this.soon;
            break;
        default:
            sizeFactor = this.popularity;
            break;
    } 

    newX = xFactor * 1.5 + 412;
    newY = yFactor * 1.65 - 20; 

    this.sizeFactor = sizeFactor
    var size = Math.round(sizeFactor / 5 + 2) ; // Calculate...

    rColor = (1 - Math.min( 1, cColor * ( 1 - kColor ) + kColor )) * 255;
    gColor = (1 - Math.min( 1, mColor * ( 1 - kColor ) + kColor )) * 255;
    bColor = (1 - Math.min( 1, yColor * ( 1 - kColor ) + kColor )) * 255;

    this.rColor = Math.round( rColor );
    this.gColor = Math.round( gColor );
    this.bColor = Math.round( bColor );

    if (this.canFit(newX, newY, size))
    {
        this.draw = true;
    }
    else {
        newX += size;
        newY += size;
        if (this.canFit(newX, newY, size))
        {
            this.draw = true;
        }
        else {
            newX -= 2 * size;
            newY -= 2 * size;
            if (this.canFit(newX, newY, size))
            {
                this.draw = true;
            }
            else {
                newX += 2 * size;
                if (this.canFit(newX, newY, size))
                {
                     this.draw = true;
                }
                else {
                    newX -= 2 * size;
                    newY += 2 * size;
                    if (this.canFit(newX, newY, size))
                    {
                        this.draw = true;
                    }
                    else {
                        this.draw = false; 
                    }
                }
            }
        }
    }

    if (this.draw) {
        if (showBubbles)
        {
            ctx.shadowOffsetX = 1;
            ctx.shadowOffsetY = 1;
            ctx.shadowBlur = 1;
            ctx.shadowColor = "rgb(0, 0, 0)";
            ctx.fillStyle = "rgb(" + this.rColor + "," + this.gColor + "," + this.bColor + ")";

            ctx.moveTo(newX,newY);
            ctx.beginPath();
            ctx.arc(newX, newY, size, 0, Math.PI*2, true);
            ctx.fill();
        }
        this.x = newX + 150; // Save position for on click events
        this.y = newY + 250;
        this.size = size;
    }
    else {
        this.x = -100; // Save position for on click events
        this.y = -100;
        this.size = 0;    
    }
    ctx.restore();
}

Equipment.prototype.drawText = function (ctx, showBubbles) {
    ctx.save();

    newX = this.x - 150; 
    newY = this.y - 250; 

    var size = Math.round(this.sizeFactor / 5 + 2) ; // Calculate...

    if (this.draw) {
        if (showBubbles)
        {
            ctx.font = (size / 2) + "px georgia";

            ctx.shadowOffsetX = 3;
            ctx.shadowOffsetY = 3;
            ctx.shadowBlur = 3;
            ctx.shadowColor = "rgb(" + this.rColor + "," + this.gColor + "," + this.bColor+ ")";
            ctx.fillStyle = "rgb(0, 0, 0)";
            ctx.fillText(this.name, newX - size * 1/3, newY);
        }
        else
        {
            ctx.shadowOffsetX = 3;
            ctx.shadowOffsetY = 3;
            ctx.shadowBlur = 3;
            ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
            ctx.font = (size / 2) + "px georgia";
            ctx.fillStyle = "rgba(" + this.rColor + "," + this.gColor + "," + this.bColor+ ",1)";
            ctx.fillText(this.name, newX, newY + 160);
         }
    }
    ctx.restore();
}

var Triangle = function () {
    this.frame = [100, -200, 800, 800];
    this.duration = 10;

    this.equipments = [
        new Equipment("Art", 110, 0, 0, 50, 77, 102), 
        new Equipment("Craft", 0, 110, 0, 55, 61, 96),
        new Equipment("Tech", 0, 0, 110, 47, 41, 104),
        new Equipment("2D", 60, 10, 80, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("3D", 50, 0, 70, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("3D Printing", 47, 28, 100, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Apparel", 87, 51, 24, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Arduino", 10, 20, 80, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Arts", 100, 0, 0, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Astronomy", 30, 50, 80, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Audio", 70, 30, 70, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Ballistics", 0, 78, 72, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("BEAM", 10, 20, 60, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Beer", 54, 63, 78, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Beverages", 61, 42, 56, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Bicycles", 31, 73, 50, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Bikes", 45, 32, 90, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Biology", 22, 0, 80, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Blacksmithing", 88, 53, 18, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Canning", 21, 45, 13, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Cars", 10, 0, 87, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Cheesemaking", 54, 60, 12, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Chemistry", 10, 0, 90, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Circuit Bending", 43, 2, 100, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Circuits", 7, 0, 70, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("CNC", 87, 23, 43, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Communications", 10, 39, 87, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Computers", 40, 50, 90, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Crochet", 12, 87, 0, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Culinary", 43, 89, 15, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Design", 62, 0, 50, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Desserts", 43, 98, 0, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Drawing", 92, 10, 0, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Electric Vehicles", 0, 0, 75, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Electronics", 30, 60, 90, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Fabrication", 14, 80, 60, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Fermentation", 50, 50, 20, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Film", 100, 23, 2, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Flight", 21, 0, 92, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Furniture", 50, 40, 0, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Gadgets", 50, 0, 78, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Gaming", 40, 0, 92, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Gardening", 12, 80, 0, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Glass", 100, 50, 0, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("GPS", 0, 40, 63, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Grilling and Barbecue", 12, 95, 21, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Hacks and Mods", 34, 12, 87, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Halloween", 30, 70, 30, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Ham Radio", 23, 70, 70, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Heirloom Technology", 0, 40, 80, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Home", 60, 80, 43, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Home Entertainment", 100, 0, 50, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Homesteading", 0, 89, 10, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Infusions", 67, 43, 2, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Jewelry", 54, 89, 9, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Junkbots", 10, 56, 95, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Kids", 12, 98, 3, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Knitting", 22, 79, 0, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Laser Cutting", 35, 0, 70, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Lego", 0, 70, 30, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Maintenance and Repair", 10, 80, 50, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Meat", 67, 98, 45, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Mechanics", 10, 60, 80, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)), 
        new Equipment("Metalworking", 0, 95, 0, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Mobile", 15, 0, 85, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Molecular Gastronomy", 80, 0, 80, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Motor", 0, 50, 60, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Music", 95, 10, 42, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Musical Instruments", 92, 0, 10, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Networking", 5, 0, 79, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Office", 70, 40, 78, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Open Source Hardware", 12, 1, 94, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Open Source Software", 9, 0, 89, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Outdoors", 23, 85, 21, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Painting", 94, 8, 0, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Paper Airplane Surfing", 34, 0, 82, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Paper Crafts", 45, 97, 0, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Performance", 92, 40, 0, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Photography", 94, 0, 12, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Plush", 12, 85, 1, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Pranks",7, 23, 43, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Printmaking", 95, 43, 0, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Programming", 52, 20, 82, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("PSP", 0, 54, 67, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Recycle", 23, 43, 78, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Remote Control", 0, 21, 93, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Repurposed Tech", 32, 56, 93, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Retro Tech", 12, 0, 99, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Robotics", 29, 12, 82, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Robots", 23, 32, 80, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Rocketry", 0, 10, 90, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Science Projects", 10, 10, 92, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Sculpture", 92, 21, 0, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Sewing", 40, 92, 10, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Soft Circuits", 60, 60, 70, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Solar", 10, 10, 92, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Soldering", 82, 0, 62, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Spy", 20, 76, 92, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Telecommunications", 15, 0, 85, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Theater", 92, 62, 0, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("UAVs", 0, 10, 90, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Vacuum Forming", 0, 92, 12, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Vegetarian", 30, 72, 12, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("VoIP", 0, 0, 91, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Watercraft", 23, 50, 28, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Wearables", 41, 89, 87, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Weaving", 0, 95, 0, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Welding", 82, 0, 12, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Wind Energy", 10, 40, 85, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Wine", 21, 72, 21, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Wireless", 0, 20, 91, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Woodworking", 12, 91, 12, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Workshop", 34, 72, 9, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Encaustic", 92, 10, 0, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Watercolor", 95, 0, 0, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Oil", 98, 0, 0, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Acrylic", 97, 0, 0, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Figure Study", 89, 21, 0, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
        new Equipment("Collabotron", 40, 40, 40, Math.floor(Math.random()*101), Math.floor(Math.random()*101), Math.floor(Math.random()*101)),
    ];

    for (var n = 0; n < this.equipments.length; n++) {
        var equipment = this.equipments[n];
        this.equipments[equipment.name] = equipment;
    }

    pixelSquares = new Array(); // 4 pixels each
    for (var i=0; i < squareCt*squareCt; i++) {
        pixelSquares[i] = false;
    }

};

Triangle.prototype.search = function (ctx, equipmentName, xVar, yVar, sizeVar, showBubbles) {
    for (var i=0; i < squareCt*squareCt; i++) {
        pixelSquares[i] = false;
    }

    for (var n = 0; n < this.equipments.length; n++) {
        var equipment = this.equipments[n];
        if (equipment.name.toLowerCase().indexOf(equipmentName.toLowerCase()) !=-1) {
            equipment.drawBubbles(ctx, xVar, yVar, sizeVar, showBubbles);
        }
        else {
            equipment.x = -101;
            equipment.y = -101;
        }
    }    
    for (var n = 0; n < this.equipments.length; n++) {
        var equipment = this.equipments[n];
        if (equipment.name.toLowerCase().indexOf(equipmentName.toLowerCase()) !=-1) {
            equipment.drawText(ctx, showBubbles);
        }
        else {
            equipment.x = -101;
            equipment.y = -101;
        }
    }    
};

Triangle.prototype.findClosest = function (ctx, x, y, scale) {
    for (var i=0; i < squareCt*squareCt; i++) {
        pixelSquares[i] = false;
    }

    var xDelta = 80;
    var yDelta = 250;
    var delta = xDelta + yDelta;
    var winningEquipment = "";
    x *= scale; // Account for zooming
    y *= scale;

    for (var n = 0; n < this.equipments.length; n++) {
        var equipment = this.equipments[n];
        xDelta = Math.abs(x - equipment.x);
        yDelta = Math.abs(y - equipment.y);
        if (delta > xDelta + yDelta) {
            delta = xDelta + yDelta;
            winningEquipment = equipment;
        }
    }    

    if (winningEquipment != "")
    {
        //alert(winningEquipment.name);
        ctx.save();

        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
        ctx.shadowBlur = 1;
        ctx.shadowColor = "rgb(0, 0, 0)";
        ctx.fillStyle = "rgb(" + winningEquipment.rColor + "," + winningEquipment.gColor + "," + winningEquipment.bColor + ")";

        ctx.moveTo(winningEquipment.x,winningEquipment.y);
        ctx.beginPath();
        ctx.arc(winningEquipment.x,winningEquipment.y, size * 2, 0, Math.PI*2, true);
        ctx.fill();

        ctx.font = size + "px georgia";

        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;
        ctx.shadowBlur = 3;
        ctx.shadowColor = "rgb(" + winningEquipment.rColor + "," + winningEquipment.gColor + "," + winningEquipment.bColor+ ")";
        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.fillText(winningEquipment.name, winningEquipment.x - size * 2/3, winningEquipment.y - winningEquipment.size);
        ctx.fillText(winningEquipment.soon, winningEquipment.x - size * 2/3, winningEquipment.y);
        ctx.fillText(winningEquipment.nearby, winningEquipment.x - size * 2/3, winningEquipment.y + winningEquipment.size);
        ctx.fillText(winningEquipment.popularity, winningEquipment.x - size * 2/3, winningEquipment.y + winningEquipment.size*2);

        ctx.restore();
    }
};


Triangle.prototype.searchColor = function (ctx, sizeVar, showBubbles, 
         cHigh, cLow, mHigh, mLow, yHigh, yLow) {

    for (var i=0; i < squareCt*squareCt; i++) {
        pixelSquares[i] = false;
    }
    for (var n = 0; n < this.equipments.length; n++) {
        var equipment = this.equipments[n];
        if (equipment.inColorRange(cHigh, cLow, mHigh, mLow, yHigh, yLow)) {
            equipment.drawBubbles(ctx, "colors", "colors", sizeVar, showBubbles, this.pixelSquares);
        }
        else {
            equipment.x = -101;
            equipment.y = -101;
            equipment.draw = false;
        }
    }    
    for (var n = 0; n < this.equipments.length; n++) {
        var equipment = this.equipments[n];
        if (equipment.draw) {
            equipment.drawText(ctx, showBubbles);
        }
    }    
};