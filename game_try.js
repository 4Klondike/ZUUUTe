var game = new Phaser.Game(1000, 600, Phaser.AUTO);

var facing = "left"; // Which direction the character is facing (default is 'left')
//var facing2 = 
var hozMove = 160; // The amount to move horizontally
var vertMove = -350; // The amount to move vertically (when 'jumping')
var jumpTimer = 0; // The initial value of the timer

var allObjs = [];

var numofps = 0;

//var p1;
//var p2;

var plat;

var GameState = {
    preload: function() {
        game.load.image('background', 'assets/background.png');
        game.load.spritesheet('p1', 'assets/p1_large.png', 140, 120,6);
        game.load.spritesheet('p2', 'assets/p2_large.png', 140, 120,6);
        game.load.spritesheet('p3', 'assets/p3_large.png', 140, 120,6);
        game.load.spritesheet('p4', 'assets/p4_large.png', 140, 120,6);
        game.load.image('healthbar', 'assets/health_full.png');
        game.load.image('healthempty', 'assets/health_empty.png');

        game.load.image('gnd','assets/platform_large.png');
        
    },
    create: function() {
        // Make the background color of the game's stage be white (#FFFFFF)
        game.stage.backgroundColor = '#D3D3D3';

        // Start the physics system ARCADE
        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.add.image(0,0,'background');

        game.add.image(50,370, 'gnd');

        healthempty = game.add.image(10,10, 'healthempty')
        healthempty.scale.setTo(10,10)
        healthbar = game.add.image(10,10, 'healthbar')


        //plat = game.physics.add.staticGroup()

        //plat.create(400, 568, 'gnd');



        p1 = new Player(game, 250, 900, 'p1', 0, "left",100);
        p2 = new Player(game, 0, 900, 'p2', 1, "left",100);
       // p3 = new Player(game,500,900, 'p3',2, "left");
        //p4 = new Player(game,800,800, 'p4', 3, "left");

       

    },
    // the update function is basically an infinite loop
    update: function() {

        healthbar.scale.setTo(4,10);

        p1.updatePLS();
        p2.updatePLS();
        //p3.updatePLS();
        //p4.updatePLS();


    }
};

game.state.add('GameState', GameState);
game.state.start('GameState');

class Player extends Phaser.Sprite {
    constructor(game, x, y, sprite, frame, facing,hlth) {

        super(game, x, y, sprite, frame);
        this.x = x;
        this.y = y;
        this.facing = facing;
        this.frame = frame;
        this.hlth = hlth;

        //game.physics.arcade.checkCollision.down = false;
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

        this.sprite.body.onCollide = new Phaser.Signal();
        //var numofps = numofps +1;
        allObjs.push(this);
        //console.log(allObjs.length);

    }

    

    updatePLS() {


        this.sprite.body.velocity.x = 0;

        if(this.frame === 0){
            //if(game.input.keyboard.isDown(Phaser.Keyboard.J)){}

            for (var i= 0; i < allObjs.length; i++){
            if(allObjs[i] !== this){
                //console.log(Math.abs(this.sprite.position.x - allObjs[i].sprite.position.x));

                    if( game.input.keyboard.isDown(Phaser.Keyboard.J) && Math.abs(this.sprite.position.x - allObjs[i].sprite.position.x) < 70 && Math.abs(this.sprite.position.y - allObjs[i].sprite.position.y) < 70){
                        console.log("x");
                        this.hlth -= 10;
                    }
                }
            }
   

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
        else{

            for (var i= 0; i < allObjs.length; i++){
            if(allObjs[i] !== this){
                //console.log(Math.abs(this.sprite.position.x - allObjs[i].sprite.position.x));

                    if( game.input.keyboard.isDown(Phaser.Keyboard.J) && Math.abs(this.sprite.position.x - allObjs[i].sprite.position.x) < 70 && Math.abs(this.sprite.position.y - allObjs[i].sprite.position.y) < 70){
                        console.log("x");
                        this.hlth -= 10;
                    }
                }
            }
            

            if (game.input.keyboard.isDown(Phaser.Keyboard.A))
        {
            // Set the 'player' sprite's x velocity to a negative number:
            //  have it move left on the screen.
            this.sprite.body.velocity.x = -hozMove;
            this.sprite.scale.setTo(-1,1);
            if (this.sprite.body.onFloor() && !game.input.keyboard.isDown(Phaser.Keyboard.F)) {
                this.sprite.animations.play('walk');
            }
            else if (game.input.keyboard.isDown(Phaser.Keyboard.F)){
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

        else if (game.input.keyboard.isDown(Phaser.Keyboard.D))
        {
            // Set the 'player' sprite's x velocity to a positive number:
            //  have it move right on the screen.
            this.sprite.body.velocity.x = hozMove;
            this.sprite.scale.setTo(1,1);
             if (this.sprite.body.onFloor() && !game.input.keyboard.isDown(Phaser.Keyboard.F)) {
                this.sprite.animations.play('walk');
            }
            else if (game.input.keyboard.isDown(Phaser.Keyboard.F)){
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
        else if (game.input.keyboard.isDown(Phaser.Keyboard.F)) {
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




            if (game.input.keyboard.isDown(Phaser.Keyboard.W) && this.sprite.body.onFloor() && game.time.now > jumpTimer)
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
}