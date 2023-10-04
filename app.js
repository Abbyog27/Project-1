//global DOM variables
const ninjaImage = document.querySelector('#ninja');
const starImage = document.querySelector('#star');
const sushiImage = document.querySelector('#sushi');
const game = document.querySelector('#game');
const score = document.querySelector('#score');
const status = document.querySelector('#status');
const ctx = game.getContext('2d');
let ninja;
let star;
let sushi;

// ====================== PAINT INTIAL SCREEN ======================= //
// EVENT LISTENERS
//having the ninja move with mouse movement
const mouse = {
    x: 0,
    y: 0
}
game.addEventListener("mousemove", (e) => {
    mouse.x = e.offsetX;
    mouse.y = e.offsetY
});
// ====================== SETUP FOR CANVAS RENDERING ======================= //
// 2D rendering context for canvas element
// This is used for drawing shapes, text, images, etc.
game.setAttribute('height', getComputedStyle(game)['height']);
game.setAttribute('width', getComputedStyle(game)['width']);


// ====================== ENTITIES ======================= //
class Player {
    constructor(playerImage, x, y, width, height) {
        this.playerImage = playerImage;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.alive = true;
        //rendering Ninja on canvas
        this.render = function (x,y) {
            ctx.drawImage(this.playerImage, x, y, this.width, this.height);
        }
    }
}

class Target {
    constructor(image, x, y, width, height) {
        this.image = image;
        this.x = x;
        this.y = y;
        this.speedX = 0;
        this.speedY = 0;
        this.gravity = 0.05;
        this.gravitySpeed = 0;
        this.width = width;
        this.height = height;
        //rendering and adding gravity so the target falls
        this.render = function () {
            this.gravitySpeed += this.gravity;
            this.y += this.speedY + this.gravitySpeed;
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }
}

class Projectile {
    constructor(image, x, y, width, height) {
        this.image = image;
        this.x = x;
        this.y = y;
        this.speedX = 0;
        this.speedY = 0;
        this.traveling = 0.15;
        this.travelingSpeed = 0;
        this.width = width;
        this.height = height;
        //rendering and making the ninja star to go across the canvas(game)
        this.render = function(x, y) {
            this.travelingSpeed += this.traveling;
            this.x += this.speedX + this.travelingSpeed;
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }
}
// ====================== GAME PROCESSES ======================= //
//creating a new player, new target instance, and new projectile instance
const player = new Player(ninjaImage, 350, 500, 100, 100);
const target = new Target (sushiImage, 50, 50, 50, 50);
const projectile = new Projectile (starImage, 50, 50, 50, 50);

//create gameLoop function to keep target moving at set interval
function gameLoop() {
    ctx.clearRect(0, 0, game.width, game.height);
    //create boundaries for the ninja within the canvas(game)
    if (mouse.x <= player.width/2) {
        mouse.x = player.width/2;
    }
    if(mouse.x >= game.width - (player.width/2)) {
        mouse.x = game.width - (player.width/2);
    }
    if (mouse.y <= player.height/2) {
        mouse.y = player.height/2;
    }
    if(mouse.y >= game.height - (player.height/2)) {
        mouse.y = game.height - (player.height/2);
    }
    player.render(mouse.x - (player.width/2), mouse.y - (player.height/2));
    target.render();
    projectile.render();
}

let runGame = setInterval(gameLoop, 60);

