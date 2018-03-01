var bulletTime = 0;
var maxrocks=10;
var minsvelocity=50;
var maxvelocity=200;
var nrofrocks=4;
var xpos;
var ypos;
var side;
var randvec;
var i;
var randomVelocity;
var randomAngle
var spacerock;

var Play={

create:function () {   
   
console.log('played')
    var score=game.time;
    //  background
    var background = game.add.image(game.world.centerX, game.world.centerY, 'background');
    background.anchor.set(0.5, 0.5);
    background.width = game.width;
    background.height = game.height;

    // player
    player = game.add.sprite(400, 300, 'ship');
    player.scale.setTo(0.3,0.3);
    player.anchor.setTo(0.5, 0.5);
    game.physics.enable(player, Phaser.Physics.ARCADE);
    

    // bullets
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    
     //  40 max at once
    bullets.createMultiple(40, 'bullet');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 0.5);

    //  And some controls to play the game with
    cursors = game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    
    // spacerocks
    spacerocks = game.add.group();
    spacerocks.enableBody = true;
    spacerocks.physicsBodyType = Phaser.Physics.ARCADE;

    //function that creates sprites
    createSpacerocks();
},
update:function() {
    //check if crash or rock going boom
    game.physics.arcade.overlap(player, spacerocks, destroyship,null, this);
    game.physics.arcade.overlap(bullets, spacerocks, destroyrock, null, this);
   

    if (cursors.up.isDown)
    {
        game.physics.arcade.accelerationFromRotation(player.rotation, 200, player.body.acceleration);
    }
    else
    {
        player.body.acceleration.set(0);
    }

    if (cursors.left.isDown)
    {
        player.body.angularVelocity = -300;
    }
    else if (cursors.right.isDown)
    {
        player.body.angularVelocity = 300;
    }
    else
    {
        player.body.angularVelocity = 0;
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
    {
        fireBullet();
    }
    // boundery thingy
    screenWrap(player);

},

}
function fireBullet()  {

    if (game.time.now > bulletTime)
    {
        bullet = bullets.getFirstExists(false);
        
        if (bullet)
        {
            bullet.reset(player.body.x + 16, player.body.y + 16);
            bullet.lifespan = 2000;
            bullet.rotation = player.rotation;
            bullet.scale.setTo(0.4,0.4);
            game.physics.arcade.velocityFromRotation(player.rotation, 400, bullet.body.velocity);
            bulletTime = game.time.now + 200; // +250 kan vara vilket tal som helst högre => längrre tid emellan kulor
            bullet.body.collideWorldBounds=true;
            bullet.body.onWorldBounds = new Phaser.Signal();
            bullet.body.onWorldBounds.add(resetSprite, this);
        }
        
        
    }
}

function createSpacerocks () {


        for ( i=0; i < nrofrocks; i++ ) {
            addrock();
        }
        

}

function screenWrap (sprite) {

    if (sprite.x < 0)
    {
        sprite.x = game.width;
    }
    else if (sprite.x > game.width)
    {
        sprite.x = 0;
    }

    if (sprite.y < 0)
    {
        sprite.y = game.height;
    }
    else if (sprite.y > game.height)
    {
        sprite.y = 0;
    }

}

function resetSprite (sprite) {

    sprite.reset();
}
function destroyship (player, spacerocks) {

    player.reset();
    nrofrocks=4;
    spacerocks.reset();
  
}
function destroyrock (bullets, spacerocks) {

   
    bullets.reset();
    spacerocks.reset();
    
    if(nrofrocks<maxrocks)
    {
        nrofrocks=nrofrocks+1;
        console.log(nrofrocks)
        addrock();
        addrock();
    }
    else
    {
        addrock();
    }
   


  
}
function addrock() {

            side = Math.round(Math.random());
            
            if (side) {
                x = Math.round(Math.random()) * game.width;
                y = Math.random() * game.height;
            } else {
                x = Math.random() * game.width;
                y = Math.round(Math.random()) * game.height;
            }
            spacerock=spacerocks.create(x,y,'spacerock');
            spacerock.anchor.set(0.5, 0.5);
            randomAngle = game.math.degToRad(game.rnd.angle());
            randomVelocity = game.rnd.integerInRange(minsvelocity, maxvelocity);
            game.physics.arcade.velocityFromRotation(randomAngle, randomVelocity, spacerock.body.velocity);
            spacerock.body.collideWorldBounds=true;
            spacerock.body.bounce.setTo(1, 1);
};

  