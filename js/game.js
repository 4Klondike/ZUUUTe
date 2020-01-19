 var game = new Phaser.Game(1000, 600, Phaser.AUTO);

var facing = "left"; // Which direction the character is facing (default is 'left')
//var facing2 = 
var hozMove = 160; // The amount to move horizontally
var vertMove = -210; // The amount to move vertically (when 'jumping')
var jumpTimer = 0; // The initial value of the timer

var p1;
var p2;

var GameState = {
    preload: function() {
        game.load.image('background', 'assets/background.png');
        game.load.spritesheet('p1', 'assets/p1_large.png', 140, 120,6);
        game.load.spritesheet('p2', 'assets/p2_large.png', 140, 120,6);
        
    },
    create: function() {
        // Make the background color of the game's stage be white (#FFFFFF)
        game.stage.backgroundColor = '#D3D3D3';

        // Start the physics system ARCADE
        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.add.image(0,0,'background');

        var facing1 = "left";
        var facing2 = "left";

        p1 = new Player(game, 250, 500, 'p1', 0, facing1);
        p2 = new Player(game, 0, 0, 'p2', 0, facing2);
    },
    // the update function is basically an infinite loop
    update: function() {
        p1.updatePLS();
        p2.updatePLS();
    }
};

game.state.add('GameState', GameState);
game.state.start('GameState');

class Player extends Phaser.Sprite {
    constructor(game, x, y, sprite, frame, facing) {

        super(game, x, y, sprite, frame);
        this.x = x;
        this.y = y;
        this.facing = facing;

        //game.physics.startSystem(Phaser.Physics.ARCADE);
        //game.add.sprite(this);

        this.sprite = game.add.sprite(x, y, sprite);
        //game.add.sprite(x, y, sprite);

        this.sprite.animations.add('idle',[1,5],1,true);
        this.sprite.animations.add('walk',[0,1,2,1],7,true);
        this.sprite.animations.add('swing',[3,4],4,false);
        this.sprite.animations.add('jump',[3],1,true);


        game.physics.enable(this.sprite);
        // We want the player to collide with the bounds of the world
        this.sprite.body.collideWorldBounds = true;

        // Set the amount of gravity to apply to the physics body of the 'player' sprite
        this.sprite.body.gravity.y = 200;
        console.log("hi");
    }

    updatePLS() {

        this.sprite.body.velocity.x = 0;
        // Check if the left arrow key is being pressed

        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
        {
            // Set the 'player' sprite's x velocity to a negative number:
            //  have it move left on the screen.
            this.sprite.body.velocity.x = -hozMove;
            this.sprite.scale.setTo(-1,1);
            if (this.sprite.body.onFloor() && !game.input.keyboard.isDown(Phaser.Keyboard.J)) {
                this.sprite.animations.play('walk');
            }
            else if (game.input.keyboard.isDown(Phaser.Keyboard.J)){
                this.sprite.animations.play('swing');
                if (this.sprite.body.onFloor()) {
                    this.sprite.body.velocity.x = 0;
                }
            }
            else {
                this.sprite.animations.play('jump');
            }
        }

        else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
        {
            // Set the 'player' sprite's x velocity to a positive number:
            //  have it move right on the screen.
            this.sprite.body.velocity.x = hozMove;
            this.sprite.scale.setTo(1,1);
             if (this.sprite.body.onFloor() && !game.input.keyboard.isDown(Phaser.Keyboard.J)) {
                this.sprite.animations.play('walk');
            }
            else if (game.input.keyboard.isDown(Phaser.Keyboard.J)){
                this.sprite.animations.play('swing');
                if (this.sprite.body.onFloor()) {
                    this.sprite.body.velocity.x = 0;
                }
            }
            else {
                this.sprite.animations.play('jump');
            }
        } 
        else if (game.input.keyboard.isDown(Phaser.Keyboard.J)) {
            this.sprite.animations.play('swing');
        }
        else if (this.sprite.body.velocity.x == 0 && this.sprite.body.velocity.y == 0) 
        {
            this.sprite.animations.play('idle');
        }



        if (game.input.keyboard.isDown(Phaser.Keyboard.UP) && this.sprite.body.onFloor() && game.time.now > jumpTimer)
        {
            // Set the 'player' sprite's y velocity to a negative number
            //  (vertMove is -90) and thus have it move up on the screen.
            this.sprite.body.velocity.y = vertMove;
            // Add 650 and the current time together and set that value to 'jumpTimer'
            // (The 'jumpTimer' is how long in milliseconds between jumps.
            //   Here, that is 650 ms.)
            jumpTimer = game.time.now + 650;

            this.sprite.animations.play('jump');
        }
    }
}