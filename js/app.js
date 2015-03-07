/* Enemy object */

// Enemies the player must avoid
var Enemy = function(x,y) {

    // Here we identify the sprite of the enemy ant its position&movements
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    // We randomly determine the speed and we ensure that there's not any "slow" movement of the any enemy
    this.speed = Math.floor((Math.random() * 400) + 150);
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // We identify the position of the enemies and, when they are out of the canvas, we restart them
    if(this.x <= 500){
        this.x += this.speed * dt;
    }else{
        this.x = -100;
    }

    // When the player collisions with an enemy, restart
    if(player.x >= this.x - 30 && player.x <= this.x + 30 && player.y >= this.y - 30 && player.y <= this.y + 30){
        fxSound = new Audio();
        fxSound.src = "sounds/fail.wav";
        fxSound.play();
        player.reset();
    }
}

// Draw the enemy objects on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}


/* Player Object */

// Creating the player and positioning it on the canvas
var Player = function(){
    this.sprite = 'images/char-cat-girl.png';
    this.x = 200;
    this.y = 400;
}

// Create function to reset player to beginning
Player.prototype.reset = function() {
  player.x = 200;
  player.y = 400;
}

// Moving (updating the position) of the player
Player.prototype.update = function(){
    // We update the position of the player identifying the actions of the keyboard
    if(this.ctlKey === 'up'){
        this.y = this.y - 40;
    }else if (this.ctlKey === 'down' && this.y != 400){
        this.y = this.y + 40;
    }else if(this.ctlKey === 'left' && this.x > 0){ 
        this.x = this.x - 40;
    }else if(this.ctlKey === 'right' && this.x != 400){
        this.x = this.x + 40;
    }

    this.ctlKey = null;
    
    // When the player arrives to the river, we restart
    if(this.y <= 0){
        fxSound = new Audio();
        fxSound.src = "sounds/river.wav";
        fxSound.play();
        console.log(punctuation ++);
        this.reset();
    }
}

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Input handler for player (identifying the keys to move the player)
Player.prototype.handleInput = function(e){
    this.ctlKey = e;    
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
(function setEnemies(){
    allEnemies.push(new Enemy(-100, 60));
    allEnemies.push(new Enemy(-100, 100));
    allEnemies.push(new Enemy(-100,150));
    allEnemies.push(new Enemy(-100,220));
}());

var player = new Player(); 

// To log in the console how many times the player has arrived to the river
var punctuation = 1;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});