var myGamePiece;
var myObstacles = [];
var background = new Image();
background.src = "assets/bg.png";

function startGame() {
    myGamePiece = new component(200, 200, "assets/granny.png", 10, 240, "image", 3, false, false);
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 800;
        this.canvas.height = 500;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }    
}

function component(width, height, color, x, y, type, speed, jumping, grounded) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;
    this.jumping = jumping;
    this.grounded = grounded;
    this.gravity = 0.05;
    this.gravitySpeed = 0;      
    this.update = function() {
        ctx = myGameArea.context;
        //ctx.drawImage(background,0,0, 800, 500);
        if (type == "image") {
            ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height);
        } else {
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    } }
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
        if (this.x == (-this.width)) {
            this.x = 0;
        }        
    }
    
    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = 0;
        }
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x +10;
        var otherright = (otherobj.x + otherobj.width) +10;
        var othertop = otherobj.y +10;
        var otherbottom = (otherobj.y + otherobj.height) +10;
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() {
    var x, y;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            myGameArea.stop();
            return;
        } 
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(500)) {
        x = myGameArea.canvas.width;
        y = myGameArea.canvas.height - 150;
        myObstacles.push(new component(130, 130, "assets/zombie.png", x, y, "image", false, true));
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -1;
        myObstacles[i].update();
    }
    myGamePiece.newPos();    
    myGamePiece.update();
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function accelerate(n) {
    myGamePiece.gravity = n
}
function clearmove() {
    myGamePiece.speedX = 0; 
    myGamePiece.speedY = 0; 
}