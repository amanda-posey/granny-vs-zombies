console.log('Super dope game');

// TODO: Create an issue
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 300},
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
// 800x600 sets the resolution of our game.
var game = new Phaser.Game(config);

function preload ()
// This is where the images and such needed for the game will preload.
{
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
}

var platforms;

function create ()
// Game objects live here.
// 400, 300 tells the image where to display on the canvas. This is the center.
{
    this.add.image(400, 300, 'sky');
    
    //This command makes physics not apply to the platforms, as they are static.
    platforms = this.physics.add.staticGroup();

    // The following adds a base "ground" element, and some ledges.
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 200, 'ground');

    // Now we add our player. His name is Dude. 
    player = this.physics.add.sprite(100, 450, 'dude'); //creates sprite called player 100x450 pixels from bottom

    player.setBounce(0.2);
    player.setCollideWorldBounds(true); //so Dude doesn't fall off the map

    //Sprite sheet has 9 frames - these tell the computer which to use during turns.
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ {key:'dude', frame: 4} ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end:8 }),
        frameRate: 10,
        repeat: -1
    });

    this.physics.add.collider(player, platforms); //keeps Dude from falling through the ground. Super important.
}

function update ()
{
}