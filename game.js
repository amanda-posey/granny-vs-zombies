var myGamePiece;
var myBackground;
var obstacle;
var score;


function startGame() {
    myGamePiece = new component(150, 150, "assets/granny.png", 10, 240, "image", 3, false, false);
    myBackground = new component(800, 500, "assets/bg.png", 0, 0, "background", 0, false, true);
    obstacle = new component(100, 125, "assets/zombie.png", 300, 120, "background")
    
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
    if (type == "image" || type == "background") {
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
        if (type == "image" || type == "background") {
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
        if (type == "background") {
            ctx.drawImage(this.image, 
                this.x + this.width, 
                this.y,
                this.width, this.height);
        }
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
        if (this.type == "background") {
            if (this.x == -(this.width)) {
                this.x = 0;
            }
        }
    } 
    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
          this.y = rockbottom;
          this.gravitySpeed = 0;
        }
      }   
}

function updateGameArea() {
    myGameArea.clear();
    myBackground.speedX = -1;
    myBackground.newPos();    
    myBackground.update();
    myGamePiece.newPos();    
    myGamePiece.update();
    obstacle.update();
}

function accelerate(n) {
    myGamePiece.gravity = n
}

var checkDead = setInterval(function() {
    let characterTop = parseInt(myGameArea.getComputedStyle(myGamePiece).getPropertyValue("top"));
    let blockLeft = parseInt(myGameArea.getComputedStyle(obstacle).getPropertyValue("left"));
    if(blockLeft<20 && blockLeft>-20 && characterTop>=130){
        obstacle.style.animation = "none";
        alert("Game Over. score: "+Math.floor(counter/100));
        counter=0;
        block.style.animation = "block 1s infinite linear";
    }else{
        counter++;
        document.getElementById("scoreSpan").innerHTML = Math.floor(counter/100);
    }
}, 10);

  

// document.addEventListener("click",jump);
// function jump(){
//     if(myGamePiece.image.classList == "animate"){return;}
//     //console.log(myGamePiece);
//     myGamePiece.image.classList.add("animate");
//     setTimeout(removeJump,300); //300ms = length of animation
// };
// function removeJump(){
//     myGamePiece.image.classList.remove("animate");
// }

// function move(dir) {
//     myGamePiece.image.src = "angry.gif";
//     if (dir == "up") {myGamePiece.speedY = -1; }
//     if (dir == "down") {myGamePiece.speedY = 1; }
//     if (dir == "left") {myGamePiece.speedX = -1; }
//     if (dir == "right") {myGamePiece.speedX = 1; }
// }

// function clearmove() {
//     myGamePiece.image.src = "smiley.gif";
//     myGamePiece.speedX = 0; 
//     myGamePiece.speedY = 0; 
//}