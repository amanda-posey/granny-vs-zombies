console.log('Super dope game');

// TODO: Create an issue
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
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
    this.load.p
}

function create ()
// Game objects live here
{
    this.add.image(400, 300, 'sky');
    this.add.image(400, 300, 'star');
}

function update ()
{
}