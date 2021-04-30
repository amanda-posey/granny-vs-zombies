# Grannies vs Zombies

The zombie apocalypse is upon us, but Edna still needs to get home in time to watch her stories. Help Edna jump over the zombies and stay alive.

# HOW TO PLAY

Click the Jump button to begin your game, and again to lift Edna up and over the zombies. Other games might have you jump, but this odd floating thing she does is absolutely a feature. If the zombies prevail, click Restart to reload the page and start the fun all over again.

## Start Up Screen:
![Edna](/assets/granny.png) ![A zombie](/assets/zombie.png)

# HOW TO INSTALL

## Example
1. *`Fork`* and *`Clone`* this respository to your local machine
2. Open `index.html` in your browser to play or 
3. Open the directory in your text editor of choice to view or edit the code

# HOW IT WORKS
All new components are created with a factory function, keeping everything neat.

```
function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image" || type == "background") {
        this.image = new Image();
        this.image.src = color;
    }
    this.score = 0;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;
    this.gravity = 0;
    this.gravitySpeed = 0;
 ```
 The score is maintained simply by counting the number of frames you've survived through:
 
 ```
 myScore.text="SCORE: " + myGameArea.frameNo;
    myScore.update();
 ```

# FUTURE CONSIDERATIONS

I'd really like to fine-tune my jump code, as well as add varied zombie sprites.


