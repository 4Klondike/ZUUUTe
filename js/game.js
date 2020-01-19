var config = {
    type: Phaser.AUTO,
    width : 1000,
    height : 600,
    physics : {
        default : 'arcade',
        arcade: {
            gravity : {y:300},
            debug: false
        }
    }
}

//var game = new Phaser.Game(1000, 600, Phaser.AUTO);
var game = new Phaser.Game(config);

var facing = "left"; // Which direction the character is facing (default is 'left')
//var facing2 = 
var hozMove = 160; // The amount to move horizontally
var vertMove = -210; // The amount to move vertically (when 'jumping')
var jumpTimer = 0; // The initial value of the timer

var p1;
var p2;

var platforms;
var ground

var health
var healthbar

 var GameState = {
    preload : function() {
        game.load.image('background', 'assets/background.png');
        game.load.spritesheet('p1', 'assets/p1_large.png', 140, 120,6);
        game.load.spritesheet('p2', 'assets/p2_large.png', 140, 120,6);
        game.load.image('platform', 'assets/platform_large.png')
        game.load.image('healthbar', 'assets/health_full.png');
        game.load.image('healthempty', 'assets/health_empty.png')
        
    },
    create: function()  {

        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.image(0,0,'background');
        platforms = game.add.group();
        platforms.enableBody = true;
        ground = platforms.create(500, 500, 'platform');
        ground.scale.setTo(1,1)
        ground.body.immovable = true;
        // Make the background color of the game's stage be white (#FFFFFF)
        game.stage.backgroundColor = '#D3D3D3';

        healthempty = game.add.image(10,10, 'healthempty')
        healthempty.scale.setTo(10,10)
        healthbar = game.add.image(10,10, 'healthbar')
        //healthbar.scale.setTo(4,10)

        // Start the physics system ARCADE
        

        
        //game.add.image(500, 500, 'platform');
        //this.platforms = this.physics.add.staticGroup();
        //this.physics.add.staticGroup();


        var facing1 = "left";
        var facing2 = "left";

        p1 = new Player(game, 250, 500, 'p1', 0, facing1);
        p2 = new Player(game, 0, 0, 'p2', 0, facing2);

        // this.platforms =
        // game.add.physicsGroup()
        // this.platforms.create(500, 500, 'platform')

        // game.physics.enable(this.platforms);
        if(game.physics.arcade.overlap(p1, ground)) {
            console.log("platform!");
        } else {
            console.log("no");
        }
        if (game.physics.arcade.overlap(p2, p1))
        {
            console.log("platform!");
        } else {
            console.log("no");
        }


    },
    // the update function is basically an infinite loop
    update: function() {


        p1.updatePLS();
        p2.updatePLS();
        healthbar.scale.setTo(4,10)

     
      
        // p1.update(hitPlatform)
        // p2.update(hitPlatform)

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
        this.sprite.animations.add('swing_air',[3,4],4,false);
        this.sprite.animations.add('swing_ground',[3,4,1],4,false);
        this.sprite.animations.add('jump',[3],1,true);


        game.physics.enable(this.sprite);
        // We want the player to collide with the bounds of the world
        this.sprite.body.collideWorldBounds = true;

        // Set the amount of gravity to apply to the physics body of the 'player' sprite
        this.sprite.body.gravity.y = 200;
        console.log("hi");

        //this.sprite.health = 100;
    }


    updatePLS() {



        this.sprite.body.velocity.x = 0;

        // if (this.physics.intersectBody() && game.input.keyboard.isDown(Phaser.Keyboard.J)) {
        //     if (this.sprite.alive) {
        //         this.sprite.health -= 5;
        //         if (this.sprite.health <= 0) {
        //             this.sprite.kill;
        //         }
        //     }
        // }
        // if (this.physics.add.overlap(this.sprite,sprite), this); {
        //     if (this.sprite.alive) {
        //         this.sprite.health -= 5; 
        //         if (this.sprite.health <= 0) {
        //             this.sprite.kill;
        //         }
        //     }
        // }

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
                if (this.sprite.body.onFloor()) {
                    this.sprite.animations.play('swing_ground')
                } else {
            this.sprite.animations.play('swing_air')
        }
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
                if (this.sprite.body.onFloor()) {
                    this.sprite.animations.play('swing_ground')
                } else {
            this.sprite.animations.play('swing_air')
        }
                if (this.sprite.body.onFloor()) {
                    this.sprite.body.velocity.x = 0;
                }
            }
            else {
                this.sprite.animations.play('jump');
            }
        } 
        else if (game.input.keyboard.isDown(Phaser.Keyboard.J)) {
            if (this.sprite.body.onFloor()) {
                this.sprite.animations.play('swing_ground')
            } else {
            this.sprite.animations.play('swing_air')
            }
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
    // update(hitPlatform) {
    //     this.velocity.x = 0

    //     if(this)
    // }
}