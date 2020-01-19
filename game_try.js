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
        // Load the spritesheet 'character.png', telling Phaser each frame is 40x64
        game.load.spritesheet('p1', 'assets/p1.png', 27, 24,6);
        game.load.spritesheet('p2', 'assets/p2.png', 27, 24,6);
        game.load.image('background', 'assets/background.png');
    },
    create: function() {
        // Make the background color of the game's stage be white (#FFFFFF)
        game.stage.backgroundColor = '#D3D3D3';

        // Start the physics system ARCADE
        //game.physics.startSystem(Phaser.Physics.ARCADE);

        game.add.image(0,0,'background');

        p1 = new Player(game, 500, 500, 'p1', 0);
        p2 = new Player(game, 0, 0, 'p2', 0);
    },
    update: function() {
        p1.updatePLS();
        p2.updatePLS();
    }
};

game.state.add('GameState', GameState);
game.state.start('GameState');

class Player extends Phaser.Sprite {
    constructor(game, x, y, sprite, frame) {

        super(game, x, y, sprite, frame);

        game.physics.startSystem(Phaser.Physics.ARCADE);
        //game.add.sprite(this);

        this.sprite = game.add.sprite(x, y, sprite);


        game.physics.enable(this);
        // We want the player to collide with the bounds of the world
        this.body.collideWorldBounds = true;

        // Set the amount of gravity to apply to the physics body of the 'player' sprite
        this.body.gravity.y =200;
    }

    updatePLS() {

        this.body.velocity.x = 200;
        // Check if the left arrow key is being pressed
        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
        {
            // Set the 'player' sprite's x velocity to a negative number:
            //  have it move left on the screen.
            this.body.velocity.x = -hozMove;

            // Check if 'facing' is not "left"
            if (facing !== "left")
            {
                // Set 'facing' to "left"
                facing = "left";
            }
        }

        // Check if the right arrow key is being pressed
        else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
        {
            // Set the 'player' sprite's x velocity to a positive number:
            //  have it move right on the screen.
            this.body.velocity.x = hozMove;


            // Check if 'facing' is not "right"
            if (facing !== "right")
            {
                // Set 'facing' to "right"
                facing = "right";
            }
        }
    

        // Check if the jumpButton (SPACEBAR) is down AND
        //  if the 'player' physics body is onFloor (touching a tile) AND
        //  if the current game.time is greater than the value of 'jumpTimer'
        //  (Here, we need to make sure the player cannot jump while alreay in the air
        //   AND that jumping takes place while the sprite is colliding with
        //   a tile in order to jump off it.)
        if (game.input.keyboard.isDown(Phaser.Keyboard.UP) && this.body.onFloor() && game.time.now > jumpTimer)
        {
            // Set the 'player' sprite's y velocity to a negative number
            //  (vertMove is -90) and thus have it move up on the screen.
            this.body.velocity.y = vertMove;
            // Add 650 and the current time together and set that value to 'jumpTimer'
            // (The 'jumpTimer' is how long in milliseconds between jumps.
            //   Here, that is 650 ms.)
            jumpTimer = game.time.now + 650;
        }
    }
}


// var Breakout = new Phaser.Class({


//     preload: function() {
//         // Load the spritesheet 'character.png', telling Phaser each frame is 40x64
//         this.load.spritesheet('p1', 'assets/p1.png', 160/6, 120,6);
//         this.load.spritesheet('p2', 'assets/p2.png', 160/6, 120,6);
//         this.load.image('background', 'assets/background.png');
//     }
//     var player1; // The player-controller sprite
//     var player2;
//     var player3;
//     var player4;
//     var facing = "left"; // Which direction the character is facing (default is 'left')
//     //var facing2 = 
//     var hozMove = 160; // The amount to move horizontally
//     var vertMove = -210; // The amount to move vertically (when 'jumping')
//     var jumpTimer = 0; // The initial value of the timer

//     create: function() {
//         // Make the background color of the game's stage be white (#FFFFFF)
//         this.stage.backgroundColor = '#D3D3D3';

//         // Start the physics system ARCADE
//         this.physics.startSystem(Phaser.Physics.ARCADE);

//         this.add.image(0,0,'background');

//         // Create and add a sprite to the game at the position (2*48 x 6 *48)
//         // and using, in this case, the spritesheet 'character'
//         player1 = this.add.sprite(500, 500, 'p1');
//         player2 = this.add.sprite(0, 0, 'p2');
//         //player2 = game.add.sprite(500,500,'')

//         //player1.scale.setTo(0.5,0.5);

//         // By default, sprites do not have a physics 'body'
//         // Before we can adjust its physics properties,
//         // we need to add a 'body' by enabling
//         // (As a second argument, we can specify the
//         //  physics system to use too. However, since we
//         //  started the Arcade system already, it will
//         //  default to that.)
//         this.physics.enable(player1);

//         this.physics.enable(player2);
        
//         // We want the player to collide with the bounds of the world
//         player1.body.collideWorldBounds = true;
//         player2.body.collideWorldBounds = true;

//         // Set the amount of gravity to apply to the physics body of the 'player' sprite
//         player1.body.gravity.y =200;
//         player2.body.gravity.y =200;
//     }
//     update: function() {
//         // Reset the x (horizontal) velocity
//         player1.body.velocity.x = 0;
//         player2.body.velocity.x = 0;

//         // Check if the left arrow key is being pressed
//         if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT))
//         {
//             // Set the 'player' sprite's x velocity to a negative number:
//             //  have it move left on the screen.
//             player1.body.velocity.x = -hozMove;

//             // Check if 'facing' is not "left"
//             if (facing !== "left")
//             {
//                 // Set 'facing' to "left"
//                 facing = "left";
//             }
//         }

//         // Check if the right arrow key is being pressed
//         else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
//         {
//             // Set the 'player' sprite's x velocity to a positive number:
//             //  have it move right on the screen.
//             player1.body.velocity.x = hozMove;


//             // Check if 'facing' is not "right"
//             if (facing !== "right")
//             {
//                 // Set 'facing' to "right"
//                 facing = "right";
//             }
//         }
//         if (this.input.keyboard.isDown(Phaser.Keyboard.A))
//         {
//             // Set the 'player' sprite's x velocity to a negative number:
//             //  have it move left on the screen.
//             player2.body.velocity.x = -hozMove;

//             // Check if 'facing' is not "left"
//             if (facing !== "left")
//             {
//                 // Set 'facing' to "left"
//                 facing = "left";
//             }
//         }
//         else if(this.input.keyboard.isDown(Phaser.Keyboard.D))
//         {
//             // Set the 'player' sprite's x velocity to a positive number:
//             //  have it move right on the screen.
//             player2.body.velocity.x = hozMove;


//             // Check if 'facing' is not "right"
//             if (facing !== "right")
//             {
//                 // Set 'facing' to "right"
//                 facing = "right";
//             }
//         }

//         // Check if the jumpButton (SPACEBAR) is down AND
//         //  if the 'player' physics body is onFloor (touching a tile) AND
//         //  if the current game.time is greater than the value of 'jumpTimer'
//         //  (Here, we need to make sure the player cannot jump while alreay in the air
//         //   AND that jumping takes place while the sprite is colliding with
//         //   a tile in order to jump off it.)
//         if (this.input.keyboard.isDown(Phaser.Keyboard.UP) && player1.body.onFloor() && game.time.now > jumpTimer)
//         {
//             // Set the 'player' sprite's y velocity to a negative number
//             //  (vertMove is -90) and thus have it move up on the screen.
//             player1.body.velocity.y = vertMove;
//             // Add 650 and the current time together and set that value to 'jumpTimer'
//             // (The 'jumpTimer' is how long in milliseconds between jumps.
//             //   Here, that is 650 ms.)
//             jumpTimer = this.time.now + 650;
//         }

//         if (this.input.keyboard.isDown(Phaser.Keyboard.W) && player2.body.onFloor() && game.time.now > jumpTimer)
//         {
//             // Set the 'player' sprite's y velocity to a negative number
//             //  (vertMove is -90) and thus have it move up on the screen.
//             player2.body.velocity.y = vertMove;
//             // Add 650 and the current time together and set that value to 'jumpTimer'
//             // (The 'jumpTimer' is how long in milliseconds between jumps.
//             //   Here, that is 650 ms.)
//             jumpTimer = this.time.now + 650;
//         }
//     }
// })

// var config = {
//     type: Phaser.AUTO,
//     width: 1000,
//     height: 600,
//     scene: [ Breakout ],
//     physics: {
//         default: 'arcade'
//     }
// };
// var game = new Phaser.Game(config);