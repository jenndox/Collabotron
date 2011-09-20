var Project = function (name, origin, radius) {
    this.name = name;
    this.origin = origin;
    this.radius = radius;
};

Project.prototype.draw = function (ctx) {
    ctx.save();

    ctx.translate(this.origin[0], this.origin[1]);

    // set transparency value
    ctx.globalAlpha = 0.25;

    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, Math.PI * 2, true);
    ctx.fill();


    // set transparency value
    ctx.globalAlpha = 1;

    ctx.restore();
}

var Scene = function () {
    var middleX = 500;
    var middleY = 300;

    this.projects = [
        new Project("Punk Rock Accordian Band", [10, middleY * 1/3 - 48], 56), // Arts corner
        new Project("Quilting", [middleX + 350, middleY * 1/3 - 48], 33), // Crafts corner
        new Project("Quilting", [middleX + 320, middleY * 1/3 + 10], 33), // Crafts corner
        new Project("Writing a new Compiler", [(middleX + 225) / 2 - 24, middleY + 400], 55), // Tech corner
        new Project("Startup Project", [(middleX + 225) / 2, middleY + 420], 85), // Tech corner
        new Project("Collabotron", [middleX, middleY], 15),
        new Project("Hi", [middleX - 200, middleY + 230], 40),
        new Project("Hello", [middleX + 310, middleY + 280], 13),
        new Project("Sample", [middleX + 40, middleY - 80], 80),
        new Project("Coming Soon", [middleX - 120, middleY - 100], 20),
        new Project("Hee", [middleX - 189, middleY - 94], 45),
        new Project("Whatev", [middleX - 180, middleY - 270], 75),
        new Project("New new", [middleX - 260, middleY + 140], 17),
        new Project("Ok soon", [middleX - 70, middleY + 80], 32),
        new Project("Done", [middleX + 20, middleY + 210], 36),
    ];
    for (var n = 0; n < this.projects.length; n++) {
        var project = this.projects[n];
        this.projects[project.name] = project;
    }

    this.frame = [100, -200, 2100, 1450];
};

function pickInCircle(x, y, r, myr) {
    var angle = Math.random() * (2 * Math.PI);
    var dist = Math.random() * r - myr;
    var tx = dist * Math.cos(angle);
    var ty = dist * Math.sin(angle);
    return [tx + x, ty + y];
}

Scene.prototype.draw = function (ctx) {
    for (var n = 0; n < this.projects.length; n++) {
        var project = this.projects[n];
        project.draw(ctx);
    }
};
