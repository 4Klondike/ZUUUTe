 (function (Phaser) {

    var game = new Phaser.Game(
            1000, 600, // The width and height of the game in pixels
            Phaser.AUTO, // The type of graphic rendering to use 
            // (AUTO tells Phaser to detect if WebGL is supported.
            //  If not, it will default to Canvas.)
            'phaser', // The parent element of the game
            {
                preload: preload, // The preloading function
                create: create,   // The creation function
                update: update   // The update (game-loop) function
            }
    ); 

    function preload() {
        // Load the spritesheet 'character.png', telling Phaser each frame is 40x64
        game.load.spritesheet('p1', 'assets/p1.png', 27, 24,6);
        game.load.spritesheet('p2', 'assets/p2.png', 27, 24,6);
        game.load.image('background', 'assets/background.png');


    }

    var player1; // The player-controller sprite
    var player2;
    var player3;
    var player4;

    var facing = "left"; // Which direction the character is facing (default is 'left')
    //var facing2 = 
    var hozMove = 160; // The amount to move horizontally
    var vertMove = -210; // The amount to move vertically (when 'jumping')
    var jumpTimer = 0; // The initial value of the timer

    function create() {

        // Make the background color of the game's stage be white (#FFFFFF)
        game.stage.backgroundColor = '#D3D3D3';


        // Start the physics system ARCADE
        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.add.image(0,0,'background');

        // Create and add a sprite to the game at the position (2*48 x 6 *48)
        // and using, in this case, the spritesheet 'character'
        player1 = game.add.sprite(500, 500, 'p1');
        player2 = game.add.sprite(0, 0, 'p2');


        player1.animations.add('idle',[1,5],1,true);
        player1.animations.add('walk',[0,1,2,1],7,true);
        player1.animations.add('swing',[1,5],1,true);

        player2.animations.add('idle',[1,5],1,true);
        player2.animations.add('walk',[0,1,2,1],7,true);
        player2.animations.add('swing',[1,5],1,true);

        //player2 = game.add.sprite(500,500,'')
        
        //player1.scale.setTo(0.5,0.5);

        // By default, sprites do not have a physics 'body'
        // Before we can adjust its physics properties,
        // we need to add a 'body' by enabling
        // (As a second argument, we can specify the
        //  physics system to use too. However, since we
        //  started the Arcade system already, it will
        //  default to that.)
        game.physics.enable(player1);

        game.physics.enable(player2);
        
        // We want the player to collide with the bounds of the world
        player1.body.collideWorldBounds = true;
        player2.body.collideWorldBounds = true;

        // Set the amount of gravity to apply to the physics body of the 'player' sprite
        player1.body.gravity.y =200;
        player2.body.gravity.y =200;

    }

    function update() {

        // Reset the x (horizontal) velocity
        player1.body.velocity.x = 0;
        player2.body.velocity.x = 0;

        // Check if the left arrow key is being pressed
        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
        {
            // Set the 'player' sprite's x velocity to a negative number:
            //  have it move left on the screen.
            player1.body.velocity.x = -hozMove;
            player1.scale.setTo(-1,1);
            player1.animations.play('walk');
        }
        // Check if the right arrow key is being pressed
        else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
        {
            // Set the 'player' sprite's x velocity to a positive number:
            //  have it move right on the screen.
            player1.body.velocity.x = hozMove;
            player1.scale.setTo(1,1);
            player1.animations.play('walk');
        }
        else if (player1.body.velocity.x == 0 && player1.body.velocity.y == 0) 
        {
            player1.animations.play('idle');
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.A))
        {
            // Set the 'player' sprite's x velocity to a negative number:
            //  have it move left on the screen.
            player2.body.velocity.x = -hozMove;
            player2.scale.setTo(-1,1);
            player2.animations.play('walk');
        }
        else if(game.input.keyboard.isDown(Phaser.Keyboard.D))
        {
            // Set the 'player' sprite's x velocity to a positive number:
            //  have it move right on the screen.
            player2.body.velocity.x = hozMove;
            player2.scale.setTo(1,1);
            player2.animations.play('walk');
        }
        else if (player1.body.velocity.x == 0 && player1.body.velocity.y == 0) 
        {
            player2.animations.play('idle');
        }

        // Check if the jumpButton (SPACEBAR) is down AND
        //  if the 'player' physics body is onFloor (touching a tile) AND
        //  if the current game.time is greater than the value of 'jumpTimer'
        //  (Here, we need to make sure the player cannot jump while alreay in the air
        //   AND that jumping takes place while the sprite is colliding with
        //   a tile in order to jump off it.)
        if (game.input.keyboard.isDown(Phaser.Keyboard.UP) && player1.body.onFloor() && game.time.now > jumpTimer)
        {
            // Set the 'player' sprite's y velocity to a negative number
            //  (vertMove is -90) and thus have it move up on the screen.
            player1.body.velocity.y = vertMove;
            // Add 650 and the current time together and set that value to 'jumpTimer'
            // (The 'jumpTimer' is how long in milliseconds between jumps.
            //   Here, that is 650 ms.)
            jumpTimer = game.time.now + 650;
        }

        if (game.input.keyboard.isDown(Phaser.Keyboard.W) && player2.body.onFloor() && game.time.now > jumpTimer)
        {
            // Set the 'player' sprite's y velocity to a negative number
            //  (vertMove is -90) and thus have it move up on the screen.
            player2.body.velocity.y = vertMove;
            // Add 650 and the current time together and set that value to 'jumpTimer'
            // (The 'jumpTimer' is how long in milliseconds between jumps.
            //   Here, that is 650 ms.)
            jumpTimer = game.time.now + 650;
        }
    }

}(Phaser));